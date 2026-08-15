import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';

export async function PUT(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json(
        { message: 'Not authorized, token failed' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { problemsSolved, level } = body;

    if (problemsSolved !== undefined) {
      user.problemsSolved = problemsSolved;
    }
    if (level !== undefined) {
      user.level = level;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!user.lastActiveDate) {
      user.streak = 1;
      user.lastActiveDate = now;
    } else {
      const lastActive = new Date(user.lastActiveDate);
      const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());

      if (lastActiveDay.getTime() === today.getTime()) {
        // Same day activity: preserve current streak
      } else if (lastActiveDay.getTime() === yesterday.getTime()) {
        // Consecutive day: increment streak
        user.streak = (user.streak || 0) + 1;
        user.lastActiveDate = now;
      } else {
        // Missed day: reset streak to 1
        user.streak = 1;
        user.lastActiveDate = now;
      }
    }

    await user.save();

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
      { message: error.message || 'Error updating user stats' },
      { status: 500 }
    );
  }
}
