import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../server/db/index';
import { p2ip_feedback } from '../../../server/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { feedback: feedbackContent } = await request.json();

    if (!feedbackContent) {
      return NextResponse.json({ error: 'Feedback content is required' }, { status: 400 });
    }

    await db.insert(p2ip_feedback).values({
      content: feedbackContent,
    }).execute();

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling feedback submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedback = await db.select().from(p2ip_feedback);
    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

