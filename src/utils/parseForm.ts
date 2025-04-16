import formidable from "formidable";
import { NextRequest } from "next/server";

export const parseForm = (req: NextRequest): Promise<{ fields: any; files: any }> => {
  const form = formidable({ multiples: true, uploadDir: "uploads/movie-posters", keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};