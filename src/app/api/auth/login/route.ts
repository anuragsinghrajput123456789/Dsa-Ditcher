import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/server/models/User';
import { generateToken } from '@/server/auth/authUtils';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());

    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      level: user.level,
      problemsSolved: user.problemsSolved,
      streak: user.streak,
      lastActiveDate: user.lastActiveDate,
      token,
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error during login' },
      { status: 500 }
    );
  }
}
