"use client";

import { useState, FormEvent } from "react";
import { UploadButton } from "../utils/uploadthing";

export default function AddMoviePage() {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [emoji, setEmoji] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleUploadComplete = (files?: { ufsUrl: string }[]) => {
    if (!files || files.length === 0) {
      setError("Failed to upload the movie poster.");
      return;
    }

    const uploadedFile = files[0];
    if (uploadedFile?.ufsUrl) {
      setUploadedFileUrl(uploadedFile.ufsUrl);
    } else {
      setError("The uploaded file URL is invalid.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!uploadedFileUrl || !emoji) {
      setError("Please upload a movie poster and provide an emoji.");
      return;
    }

    try {
      const response = await fetch("/api/uploadthing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedFileUrl,
          rating,
          emoji,
        }),
      });

      if (!response.ok) throw new Error("Submission failed.");

      setSubmitted(true);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Error submitting the movie.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="flex flex-row items-center gap-16">
        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <UploadButton
            endpoint="movieUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => setError(`Upload error: ${error.message}`)}
          />
          {uploadedFileUrl && (
            <img src={uploadedFileUrl} alt="Uploaded Movie Poster" className="w-[500px] h-[749px] rounded-lg" />
          )}
        </div>

        {/* Form Section */}
        <form className="flex flex-col items-start gap-8" onSubmit={handleSubmit}>
          <h1 className="text-5xl font-extrabold">Add Your Movie</h1>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="rating" className="text-lg font-bold">Rate the Movie</label>
            <input
              id="rating"
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <span>{rating}</span>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="emoji" className="text-lg font-bold">Emoji</label>
            <input
              id="emoji"
              type="text"
              maxLength={1}
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="😊"
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md ${
              !uploadedFileUrl ? "bg-gray-500 cursor-not-allowed" : "bg-[#6A4325] hover:bg-[#8A5A37]"
            }`}
            disabled={!uploadedFileUrl}
          >
            Submit
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {submitted && <p className="text-green-500">Movie successfully submitted!</p>}
        </form>
      </div>
    </main>
  );
}
