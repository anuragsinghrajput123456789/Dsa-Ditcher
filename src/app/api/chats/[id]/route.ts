import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';
import Chat from '@/server/models/Chat';
import connectToDatabase from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();
    const chat = await Chat.findById(id);

    if (!chat) {
      return NextResponse.json({ message: 'Chat message not found' }, { status: 404 });
    }

    if (chat.user.toString() !== user._id.toString()) {
      return NextResponse.json({ message: 'Not authorized to delete this message' }, { status: 403 });
    }

    await chat.deleteOne();
    return NextResponse.json({ message: 'Chat message deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error deleting chat message' },
      { status: 500 }
    );
  }
}
