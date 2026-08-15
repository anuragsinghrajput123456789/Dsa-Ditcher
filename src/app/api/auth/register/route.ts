import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/server/models/User';
import { generateToken } from '@/server/auth/authUtils';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;
    await connectToDatabase();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      streak: 1,
      lastActiveDate: new Date(),
    });

    const token = generateToken(user._id.toString());

    return NextResponse.json(
      {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        level: user.level,
        problemsSolved: user.problemsSolved,
        streak: user.streak,
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error during registration' },
      { status: 500 }
    );
  }
}
