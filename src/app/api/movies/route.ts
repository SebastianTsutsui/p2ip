import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../server/db/index';
import { p2ip_movie_ratings } from '../../../server/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { movie, rating, emoji } = await request.json();

    if (!movie || !rating || !emoji) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await db.insert(p2ip_movie_ratings).values({
      image: movie,
      rating,
      emoji,
    }).execute();

    return NextResponse.json({ message: 'Movie submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling movie submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const movies = await db.select().from(p2ip_movie_ratings).execute();
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}