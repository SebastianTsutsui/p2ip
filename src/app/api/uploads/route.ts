import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../server/db"; 
import { p2ip_uploads } from "../../../server/db/schema";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const comment = formData.get("comment") as string;

  if (!image || !comment) {
    return NextResponse.json({ error: "Image and comment are required" }, { status: 400 });
  }

  const imageId = uuidv4();
  const imageExtension = path.extname(image.name);
  const imageName = `${imageId}${imageExtension}`;
  const imagePath = path.join(process.cwd(), "public/uploads", imageName);

  await writeFile(imagePath, Buffer.from(await image.arrayBuffer()));

  const imageUrl = `/uploads/${imageName}`;
  await db.insert(p2ip_uploads).values({ imageUrl, comment });

  return NextResponse.json({ success: true, imageUrl });
}

export async function GET() {
  const uploads = await db.select().from(p2ip_uploads); // Fetch data without ordering
  return NextResponse.json(uploads);
}