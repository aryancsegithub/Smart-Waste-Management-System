import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { collections, dustbins } from '@/db/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_STATUSES = ['scheduled', 'in_progress', 'completed', 'cancelled'];

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');

    let conditions = [eq(collections.userId, user.id)];

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ 
          error: 'Invalid status value',
          code: 'INVALID_STATUS'
        }, { status: 400 });
      }
      conditions.push(eq(collections.status, status));
    }

    if (dateFrom) {
      conditions.push(gte(collections.scheduledDate, dateFrom));
    }

    if (dateTo) {
      conditions.push(lte(collections.scheduledDate, dateTo));
    }

    const results = await db.select()
      .from(collections)
      .where(and(...conditions))
      .orderBy(desc(collections.scheduledDate));

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { dustbin_id, scheduled_date, notes } = body;

    if (!dustbin_id) {
      return NextResponse.json({ 
        error: 'dustbin_id is required',
        code: 'MISSING_DUSTBIN_ID'
      }, { status: 400 });
    }

    if (!scheduled_date) {
      return NextResponse.json({ 
        error: 'scheduled_date is required',
        code: 'MISSING_SCHEDULED_DATE'
      }, { status: 400 });
    }

    if (isNaN(parseInt(dustbin_id))) {
      return NextResponse.json({ 
        error: 'dustbin_id must be a valid integer',
        code: 'INVALID_DUSTBIN_ID'
      }, { status: 400 });
    }

    const dustbinExists = await db.select()
      .from(dustbins)
      .where(and(
        eq(dustbins.id, parseInt(dustbin_id)),
        eq(dustbins.userId, user.id)
      ))
      .limit(1);

    if (dustbinExists.length === 0) {
      return NextResponse.json({ 
        error: 'Dustbin not found or does not belong to user',
        code: 'DUSTBIN_NOT_FOUND'
      }, { status: 404 });
    }

    const newCollection = await db.insert(collections)
      .values({
        userId: user.id,
        dustbinId: parseInt(dustbin_id),
        scheduledDate: scheduled_date,
        status: 'scheduled',
        notes: notes || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newCollection[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid id query parameter is required',
        code: 'INVALID_ID'
      }, { status: 400 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(collections)
      .where(and(
        eq(collections.id, parseInt(id)),
        eq(collections.userId, user.id)
      ))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Collection not found',
        code: 'COLLECTION_NOT_FOUND'
      }, { status: 404 });
    }

    const { status, completed_date, notes, scheduled_date } = body;

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status value. Must be one of: scheduled, in_progress, completed, cancelled',
        code: 'INVALID_STATUS'
      }, { status: 400 });
    }

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (status !== undefined) {
      updates.status = status;
      
      if (status === 'completed' && !completed_date) {
        updates.completedDate = new Date().toISOString();
      }
    }

    if (completed_date !== undefined) {
      updates.completedDate = completed_date;
    }

    if (notes !== undefined) {
      updates.notes = notes;
    }

    if (scheduled_date !== undefined) {
      updates.scheduledDate = scheduled_date;
    }

    const updated = await db.update(collections)
      .set(updates)
      .where(and(
        eq(collections.id, parseInt(id)),
        eq(collections.userId, user.id)
      ))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Collection not found',
        code: 'COLLECTION_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid id query parameter is required',
        code: 'INVALID_ID'
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(collections)
      .where(and(
        eq(collections.id, parseInt(id)),
        eq(collections.userId, user.id)
      ))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Collection not found',
        code: 'COLLECTION_NOT_FOUND'
      }, { status: 404 });
    }

    const cancelled = await db.update(collections)
      .set({
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      })
      .where(and(
        eq(collections.id, parseInt(id)),
        eq(collections.userId, user.id)
      ))
      .returning();

    if (cancelled.length === 0) {
      return NextResponse.json({ 
        error: 'Collection not found',
        code: 'COLLECTION_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Collection cancelled successfully',
      collection: cancelled[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}