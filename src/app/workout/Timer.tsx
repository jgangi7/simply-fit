"use client";
import React, { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  return (
    <div className="relative w-full flex flex-row items-center justify-between mb-8">
      <span className="text-xl font-bold">{formatTime(seconds)}</span>
      <button
        className="fixed bottom-6 right-6 bg-[#e74c3c] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-[#c0392b] transition-colors z-50"
        onClick={() => setRunning(false)}
        disabled={!running}
      >
        Finish
      </button>
    </div>
  );
} 