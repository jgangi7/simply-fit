"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0082c8] mb-8 mt-4 text-center">
        Welcome to Simply Fit
      </h1>
      <div className="w-40 h-24 bg-gray-300 flex items-center justify-center mb-8 rounded shadow-md">
        <span className="text-gray-600 font-semibold">logo</span>
      </div>
      <div className="flex flex-col items-center w-full max-w-xs gap-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-[#d4f4fc] font-bold shadow focus:outline-none focus:ring-2 focus:ring-[#0082c8]"
        />
        <Link
          href="/userHome"
          className="w-full px-4 py-2 mt-2 rounded bg-[#d4f4fc] text-[#0082c8] font-bold shadow hover:bg-[#bde8f7] transition-colors text-center"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
