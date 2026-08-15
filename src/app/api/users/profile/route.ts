import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json(
        { message: 'Not authorized, token failed' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      level: user.level,
      problemsSolved: user.problemsSolved,
      streak: user.streak,
      lastActiveDate: user.lastActiveDate,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error fetching user profile' },
      { status: 500 }
    );
  }
}
