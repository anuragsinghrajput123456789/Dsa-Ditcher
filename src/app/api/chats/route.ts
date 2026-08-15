import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';
import Chat from '@/server/models/Chat';
import connectToDatabase from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json([]);
    }

    await connectToDatabase();
    const chats = await Chat.find({ user: user._id }).sort({ createdAt: 1 });

    return NextResponse.json(chats);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error fetching chat history' },
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
    const { role, content } = body;

    if (!role || !content) {
      return NextResponse.json(
        { message: 'Role and content are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const chat = await Chat.create({
      user: user._id,
      role,
      content,
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error saving chat' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await connectToDatabase();
    await Chat.deleteMany({ user: user._id });

    return NextResponse.json({ message: 'Chat history cleared successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error clearing chat history' },
      { status: 500 }
    );
  }
}
