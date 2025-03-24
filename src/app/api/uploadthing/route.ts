import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../server/db";
import { p2ip_movies } from "../../../server/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, rating, emoji } = await request.json();

    // Validate the input
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("Invalid or missing 'imageUrl'.");
    }
    if (typeof rating !== "number" || rating < 1 || rating > 10) {
      throw new Error("Invalid or missing 'rating'.");
    }
    if (!emoji || typeof emoji !== "string" || emoji.length !== 1) {
      throw new Error("Invalid or missing 'emoji'.");
    }

    // Insert into the database
    await db.insert(p2ip_movies).values({
      name: "Uploaded Movie", // Placeholder name
      url: imageUrl,
      rating,
      emoji,
    });

    return NextResponse.json({ message: "Movie successfully submitted." }, { status: 200 });
  } catch (error) {
    // Type guard to ensure 'error' is an instance of Error
    if (error instanceof Error) {
      console.error("Error saving movie:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Unknown error occurred:", error);
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
}
