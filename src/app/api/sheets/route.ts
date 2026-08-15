import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';
import Sheet from '@/server/models/Sheet';
import connectToDatabase from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json([]);
    }

    await connectToDatabase();
    const sheets = await Sheet.find({ user: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(sheets);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error fetching sheets' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, problems, difficulty, tags } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const sheet = await Sheet.create({
      user: user._id,
      title,
      description,
      problems: problems || '[]',
      difficulty: difficulty || 'Mixed',
      tags: tags || '',
    });

    return NextResponse.json(sheet, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error creating sheet' },
      { status: 500 }
    );
  }
}
