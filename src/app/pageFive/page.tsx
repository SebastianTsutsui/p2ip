"use client";

import { useEffect, useState } from "react";

type Upload = {
  id: number;
  imageUrl: string;
  comment: string;
  createdAt: string;
};

export default function DisplayUploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      const res = await fetch("../api/uploads");
      const data: Upload[] = await res.json();

      // Sort the uploads in descending order of `createdAt`
      const sortedUploads = data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setUploads(sortedUploads);
      setLoading(false);
    };

    fetchUploads();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-8 bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Uploaded <span className="text-[#6A4325]">Posters & Comments</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="flex flex-col items-center gap-4 bg-white/10 p-4 rounded-xl shadow-lg"
            >
              <img
                src={upload.imageUrl}
                alt="Uploaded Poster"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-lg font-semibold text-center">{upload.comment}</p>
              <p className="text-sm text-gray-300">
                Uploaded on: {new Date(upload.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}