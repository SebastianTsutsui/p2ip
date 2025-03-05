"use client"; 

import { useState, FormEvent } from 'react';

export default function PageTwo() {
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Full Response:', data);
        setError(data.error || 'Error submitting feedback');
        return;
      }

      console.log('Feedback submitted successfully');
      setSubmitted(true);
    } catch (err) {
      setError('Network error or server not reachable');
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Leave us FeedBack!
        </h1>
        <p className="text-lg">
          Here you can find more information about our platform and share your feedback with us.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
          <textarea
            className="rounded-xl p-4 text-black"
            placeholder="Share your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            className="rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            Submit
          </button>
        </form>
        {submitted && (
          <div className="mt-4 text-lg">
            Thank you for your feedback!
          </div>
        )}
        {error && (
          <div className="mt-4 text-lg text-red-500">
            Error: {error}
          </div>
        )}
      </div>
    </main>
  );
}
