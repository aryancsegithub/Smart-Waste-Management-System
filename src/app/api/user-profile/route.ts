import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userProfile } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_CATEGORIES = [
  'College',
  'Municipal Corporation',
  'School',
  'Cafe',
  'Restaurant',
  'Railway Station',
  'Airport',
  'Others'
] as const;

function validateMobileNumber(mobile: string): boolean {
  // Basic phone number validation: 10-15 digits, may include +, spaces, or dashes
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  return phoneRegex.test(mobile.trim());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, organization_name, category, mobile_number } = body;

    // Validate required fields
    if (!user_id || typeof user_id !== 'string' || user_id.trim() === '') {
      return NextResponse.json(
        { error: 'user_id is required and must be a non-empty string', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!organization_name || typeof organization_name !== 'string' || organization_name.trim() === '') {
      return NextResponse.json(
        { error: 'organization_name is required and must be a non-empty string', code: 'MISSING_ORGANIZATION_NAME' },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json(
        { error: 'category is required and must be a non-empty string', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category as any)) {
      return NextResponse.json(
        { 
          error: `category must be one of: ${VALID_CATEGORIES.join(', ')}`, 
          code: 'INVALID_CATEGORY' 
        },
        { status: 400 }
      );
    }

    if (!mobile_number || typeof mobile_number !== 'string' || mobile_number.trim() === '') {
      return NextResponse.json(
        { error: 'mobile_number is required and must be a non-empty string', code: 'MISSING_MOBILE_NUMBER' },
        { status: 400 }
      );
    }

    if (!validateMobileNumber(mobile_number)) {
      return NextResponse.json(
        { error: 'mobile_number must be a valid phone number', code: 'INVALID_MOBILE_NUMBER' },
        { status: 400 }
      );
    }

    // Check if profile already exists for this user
    const existingProfile = await db.select()
      .from(userProfile)
      .where(eq(userProfile.userId, user_id.trim()))
      .limit(1);

    if (existingProfile.length > 0) {
      return NextResponse.json(
        { error: 'Profile already exists for this user', code: 'PROFILE_EXISTS' },
        { status: 400 }
      );
    }

    // Create new profile
    const timestamp = new Date().toISOString();
    const newProfile = await db.insert(userProfile)
      .values({
        userId: user_id.trim(),
        organizationName: organization_name.trim(),
        category: category,
        mobileNumber: mobile_number.trim(),
        createdAt: timestamp,
        updatedAt: timestamp
      })
      .returning();

    return NextResponse.json(newProfile[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { error: 'user_id query parameter is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const profile = await db.select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId.trim()))
      .limit(1);

    if (profile.length === 0) {
      return NextResponse.json(
        { error: 'Profile not found for the specified user_id', code: 'PROFILE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}