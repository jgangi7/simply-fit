"use client";
import React, { useEffect, useState } from "react";

export default function Timer({ running }: { running: boolean }) {
  const [seconds, setSeconds] = useState(0);

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
      
    </div>
  );
} 