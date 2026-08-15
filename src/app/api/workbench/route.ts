import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/server/auth/authUtils';
import connectToDatabase from '@/lib/db';
import Workbench from '@/server/models/Workbench';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    await connectToDatabase();

    if (user) {
      const workbench = await Workbench.findOne({ user: user._id }).sort({ updatedAt: -1 });
      return NextResponse.json(workbench || null);
    } else {
      return NextResponse.json(null);
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error fetching workbench' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      return NextResponse.json({ message: 'Guest storage used' }, { status: 200 });
    }

    const body = await req.json();
    await connectToDatabase();

    let workbench = await Workbench.findOne({ user: user._id }).sort({ updatedAt: -1 });

    if (workbench) {
      workbench.problemTitle = body.problemTitle || workbench.problemTitle;
      workbench.problemDifficulty = body.problemDifficulty || workbench.problemDifficulty;
      workbench.problemDescription = body.problemDescription || workbench.problemDescription;
      workbench.constraints = body.constraints || workbench.constraints;
      workbench.examples = body.examples || workbench.examples;
      workbench.approachText = body.approachText !== undefined ? body.approachText : workbench.approachText;
      workbench.algorithmSteps = body.algorithmSteps || workbench.algorithmSteps;
      workbench.pseudocode = body.pseudocode !== undefined ? body.pseudocode : workbench.pseudocode;
      workbench.diagramData = body.diagramData || workbench.diagramData;
      workbench.aiReview = body.aiReview || workbench.aiReview;
      workbench.complexityAnalysis = body.complexityAnalysis || workbench.complexityAnalysis;
      workbench.generatedCode = body.generatedCode || workbench.generatedCode;

      const updated = await workbench.save();
      return NextResponse.json(updated);
    } else {
      const created = await Workbench.create({
        user: user._id,
        ...body,
      });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error saving workbench' },
      { status: 500 }
    );
  }
}
