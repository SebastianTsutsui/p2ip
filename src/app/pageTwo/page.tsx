"use client";

import { useState, useEffect, FormEvent } from "react";
import HomeButton from "../../utils/HomeButton";

type Feedback = {
  id: number;
  content: string;
  createdAt: string;
};

export default function PageTwo() {
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedback from the database
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data: Feedback[] = await res.json();
        setFeedbackList(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Full Response:", data);
        setError(data.error || "Error submitting feedback");
        return;
      }

      console.log("Feedback submitted successfully");
      setSubmitted(true);
      setFeedback(""); // Clear the input field
      setFeedbackList((prev) => [
        ...prev,
        { id: Date.now(), content: feedback, createdAt: new Date().toISOString() },
      ]); // Optimistically update the feedback list
    } catch (err) {
      setError("Network error or server not reachable");
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <HomeButton />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Leave us Feedback!
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

      {/* Infinite Slider */}
      <div className="container flex flex-col items-center gap-8 px-4 py-8">
        <h2 className="text-3xl font-bold">What others are saying:</h2>
        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <div className="relative m-auto w-full overflow-hidden bg-transparent">
            <div className="animate-infinite-scroll flex w-[calc(300px*10)]">
              {feedbackList.concat(feedbackList).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 w-[300px] mx-2"
                >
                  <p className="text-lg">{item.content}</p>
                  <p className="text-sm text-gray-300">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}