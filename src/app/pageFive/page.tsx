"use client"; // Add this line at the top of the file

import { useState, useEffect } from "react";

export default function YourRatingsPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();

        if (!response.ok) {
          console.error('Full Response:', data);
          setError(data.error || 'Error fetching movies');
          return;
        }

        setMovies(data.movies);
      } catch (err) {
        setError('Network error or server not reachable');
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Your Ratings
        </h1>
        {error && (
          <div className="text-lg text-red-500">
            Error: {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center bg-white/10 p-4 rounded-lg">
              <img src={movie.image} alt="Movie Poster" className="w-[500px] h-[749px] object-cover rounded-lg mb-4" />
              <div className="text-lg">{new Date(movie.createdAt).toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{movie.rating}</span>
                <span className="text-lg">{movie.emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
