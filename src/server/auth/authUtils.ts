import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import User, { IUserDocument } from '@/server/models/User';
import connectToDatabase from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_mode';

export function generateToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
}

export async function verifyAuthToken(req: NextRequest): Promise<IUserDocument | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    await connectToDatabase();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    console.error('JWT Verification Failed:', error);
    return null;
  }
}
