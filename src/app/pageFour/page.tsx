"use client";

import { useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !comment) {
      setMessage("Please provide both an image and a comment.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("comment", comment);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Upload successful!");
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-8 bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 rounded-lg bg-[#6A4325] px-4 py-2 text-white font-bold hover:bg-[#5a371f]"
      >
        Home
      </Link>

      <div className="container flex flex-col items-center gap-8 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Upload <span className="text-[#6A4325]">Image & Comment</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md bg-white/10 p-6 rounded-xl shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-lg font-bold">
              Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6A4325] file:text-white hover:file:bg-[#5a371f] bg-white text-black rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-lg font-bold">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-lg p-2 bg-white text-black"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#6A4325] px-4 py-2 text-lg font-bold text-white hover:bg-[#5a371f]"
          >
            Upload
          </button>
        </form>
        {message && (
          <p className="text-lg font-semibold text-center text-white bg-[#6A4325] p-4 rounded-lg">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}