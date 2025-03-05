"use client"; // Add this line at the top of the file

import { useState, ChangeEvent, FormEvent } from "react";

export default function AddMoviePage() {
  const [movie, setMovie] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [emoji, setEmoji] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMovieUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setMovie(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleEmojiChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 1) {
      setEmoji(event.target.value);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!movie || !emoji) {
      setError("Please upload a movie and add an emoji.");
      return;
    }

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie, rating, emoji }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Full Response:', data);
        setError(data.error || 'Error submitting movie');
        return;
      }

      console.log('Movie submitted successfully');
      setSubmitted(true);
    } catch (err) {
      setError('Network error or server not reachable');
      console.error('Error submitting movie:', err);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="flex flex-row items-center justify-center w-full px-8 py-16 gap-16">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleMovieUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`flex items-center justify-center w-[500px] h-[749px] bg-[#6A4325] text-white cursor-pointer rounded-lg border-2 border-dashed border-white ${movie ? "" : "flex-col"}`}
            style={{
              backgroundImage: movie ? `url(${movie})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!movie && <span className="text-7xl">+</span>}
            {!movie && <span className="text-2xl">Upload Movie</span>
            }
          </label>
        </div>

        <div className="flex flex-col items-start gap-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Add <span className="text-[#6A4325]">Your Movie</span>
          </h1>

          <div className="flex flex-col items-start gap-2 mt-4">
            <label htmlFor="rating" className="text-lg font-bold">
              Rate the Movie
            </label>
            <input
              id="rating"
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={handleRatingChange}
              className="w-full"
            />
            <span className="text-lg">{rating}</span>
          </div>

          <div className="flex flex-col items-start gap-2 mt-4">
            <label htmlFor="emoji" className="text-lg font-bold">
              Emoji It
            </label>
            <input
              id="emoji"
              type="text"
              value={emoji}
              onChange={handleEmojiChange}
              maxLength={1}
              className="text-center text-lg p-2 bg-[#6A4325] rounded-md"
              placeholder="😊"
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`mt-4 rounded-lg px-4 py-2 text-white ${!movie || !emoji ? 'bg-[#8A5A37] cursor-not-allowed' : 'bg-[#6A4325] hover:bg-[#8A5A37]'}`}
            disabled={!movie || !emoji}
          >
            Submit
          </button>

          {submitted && (
            <div className="mt-4 text-lg">
              Movie submitted successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 text-lg text-red-500">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
