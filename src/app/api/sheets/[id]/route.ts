import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';
import Sheet from '@/server/models/Sheet';
import connectToDatabase from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    await connectToDatabase();
    const sheet = await Sheet.findById(id);

    if (!sheet) {
      return NextResponse.json({ message: 'Sheet not found' }, { status: 404 });
    }

    if (sheet.user.toString() !== user._id.toString()) {
      return NextResponse.json({ message: 'Not authorized to edit this sheet' }, { status: 403 });
    }

    sheet.title = body.title || sheet.title;
    sheet.description = body.description || sheet.description;
    sheet.problems = body.problems !== undefined ? body.problems : sheet.problems;
    sheet.difficulty = body.difficulty || sheet.difficulty;
    sheet.tags = body.tags !== undefined ? body.tags : sheet.tags;

    const updatedSheet = await sheet.save();
    return NextResponse.json(updatedSheet);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error updating sheet' },
      { status: 500 }
    );
  }
}

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
    const sheet = await Sheet.findById(id);

    if (!sheet) {
      return NextResponse.json({ message: 'Sheet not found' }, { status: 404 });
    }

    if (sheet.user.toString() !== user._id.toString()) {
      return NextResponse.json({ message: 'Not authorized to delete this sheet' }, { status: 403 });
    }

    await sheet.deleteOne();
    return NextResponse.json({ message: 'Sheet removed successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error deleting sheet' },
      { status: 500 }
    );
  }
}
