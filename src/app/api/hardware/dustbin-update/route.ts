import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { dustbins, notifications } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Hardware API Endpoint - No Authentication Required
 * This endpoint receives data from Arduino/IoT devices
 * 
 * Expected Request:
 * POST /api/hardware/dustbin-update
 * Headers: X-API-Key: your-secret-key
 * Body: { dustbinId: number, fillLevel: number }
 */

export async function POST(request: NextRequest) {
  try {
    // Validate API Key
    const apiKey = request.headers.get('X-API-Key');
    const expectedKey = process.env.HARDWARE_API_KEY || 'default-hardware-key-123';
    
    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Invalid or missing API key', code: 'INVALID_API_KEY' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { dustbinId, fillLevel } = body;

    // Validate input
    if (!dustbinId || typeof dustbinId !== 'number') {
      return NextResponse.json(
        { error: 'Valid dustbinId is required', code: 'MISSING_DUSTBIN_ID' },
        { status: 400 }
      );
    }

    if (fillLevel === undefined || typeof fillLevel !== 'number' || fillLevel < 0 || fillLevel > 100) {
      return NextResponse.json(
        { error: 'Fill level must be a number between 0 and 100', code: 'INVALID_FILL_LEVEL' },
        { status: 400 }
      );
    }

    // Check if dustbin exists
    const existingDustbin = await db
      .select()
      .from(dustbins)
      .where(eq(dustbins.id, dustbinId))
      .limit(1);

    if (existingDustbin.length === 0) {
      return NextResponse.json(
        { error: 'Dustbin not found', code: 'DUSTBIN_NOT_FOUND' },
        { status: 404 }
      );
    }

    const dustbin = existingDustbin[0];

    // Determine status based on fill level
    let status: string;
    if (fillLevel >= 75) {
      status = 'full';
    } else if (fillLevel >= 50) {
      status = '75';
    } else if (fillLevel >= 25) {
      status = '50';
    } else {
      status = 'empty';
    }

    // Update dustbin
    const now = new Date().toISOString();
    const updated = await db
      .update(dustbins)
      .set({
        fillLevel,
        status,
        updatedAt: now,
      })
      .where(eq(dustbins.id, dustbinId))
      .returning();

    // Create alert notification if dustbin is 75% or more full
    if (fillLevel >= 75 && dustbin.userId) {
      const alertExists = await db
        .select()
        .from(notifications)
        .where(eq(notifications.dustbinId, dustbinId))
        .limit(1);

      // Only create notification if one doesn't exist for this dustbin
      if (alertExists.length === 0) {
        await db.insert(notifications).values({
          userId: dustbin.userId,
          dustbinId: dustbinId,
          type: 'alert',
          title: 'Dustbin Needs Collection',
          message: `${dustbin.name} is ${fillLevel}% full and needs immediate collection.`,
          isRead: false,
          createdAt: now,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Dustbin updated successfully',
        data: {
          id: updated[0].id,
          fillLevel: updated[0].fillLevel,
          status: updated[0].status,
          updatedAt: updated[0].updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Hardware API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      endpoint: 'hardware-dustbin-update',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
