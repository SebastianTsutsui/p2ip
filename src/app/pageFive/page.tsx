"use client";

import { useEffect, useState } from "react";

export default function ViewMoviePage() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/uploadthing")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="grid grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 bg-white text-black rounded-lg">
            <img src={movie.url} alt={movie.name} className="w-full rounded-md" />
            <h2 className="text-center mt-2">{movie.name}</h2>
            <p>Rating: {movie.rating}</p>
            <p>Emoji: {movie.emoji}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
