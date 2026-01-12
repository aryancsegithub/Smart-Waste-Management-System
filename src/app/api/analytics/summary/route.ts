import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { analytics } from '@/db/schema';
import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');

    // Validate required user_id parameter
    if (!userId) {
      return NextResponse.json(
        { error: 'user_id query parameter is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    // Security: Ensure authenticated user can only access their own analytics
    if (userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized access to analytics data', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // Validate date format if provided
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateFrom && !dateRegex.test(dateFrom)) {
      return NextResponse.json(
        { error: 'Invalid date_from format. Use YYYY-MM-DD', code: 'INVALID_DATE_FORMAT' },
        { status: 400 }
      );
    }
    if (dateTo && !dateRegex.test(dateTo)) {
      return NextResponse.json(
        { error: 'Invalid date_to format. Use YYYY-MM-DD', code: 'INVALID_DATE_FORMAT' },
        { status: 400 }
      );
    }

    // Build query conditions
    const conditions = [eq(analytics.userId, userId)];
    
    if (dateFrom) {
      conditions.push(gte(analytics.date, dateFrom));
    }
    
    if (dateTo) {
      conditions.push(lte(analytics.date, dateTo));
    }

    // Query with aggregations
    const result = await db
      .select({
        totalWasteKg: sql<number>`CAST(SUM(CAST(${analytics.wasteCollectedKg} AS REAL)) AS TEXT)`,
        avgFillLevel: sql<number>`ROUND(AVG(${analytics.fillLevelAvg}), 2)`,
        totalCollections: sql<number>`SUM(${analytics.collectionsCount})`,
        daysTracked: sql<number>`COUNT(DISTINCT ${analytics.date})`,
      })
      .from(analytics)
      .where(and(...conditions));

    // Extract the aggregated results
    const summary = result[0];

    // Handle case where no data exists for the user/date range
    if (!summary || summary.daysTracked === 0) {
      return NextResponse.json({
        totalWasteKg: 0,
        avgFillLevel: 0,
        totalCollections: 0,
        daysTracked: 0,
      });
    }

    // Format the response
    const response = {
      totalWasteKg: parseFloat(summary.totalWasteKg as unknown as string) || 0,
      avgFillLevel: summary.avgFillLevel || 0,
      totalCollections: summary.totalCollections || 0,
      daysTracked: summary.daysTracked || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET analytics summary error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}