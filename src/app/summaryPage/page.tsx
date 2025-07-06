"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import WorkoutRow from "../workout/WorkoutRow";
import { useRouter } from "next/navigation";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt: string) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function SummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  let rows = [];
  try {
    const data = searchParams.get("data");
    if (data) rows = JSON.parse(data);
  } catch (e) {
    rows = [];
  }
  const now = new Date();
  const dateString = now.toLocaleDateString();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 bg-white">
      <div className="text-xl font-normal mb-4 text-center">Good shit</div>
      <div className="text-lg font-light mb-8 text-center">{dateString}</div>
      {rows.length === 0 && (
        <div className="text-gray-400">No workout data found.</div>
      )}
      
          <div className="flex flex-col gap-4 mb-2">
            {rows.map((row: any, i: number) => (
              
            <div key={i} className="flex flex-row items-center gap-4">
              <div className="bg-[#2c9fbb] rounded px-4 py-3 font-bold text-xl flex-1 text-black max-w-[50%] text-center">
                {row.lift ? toTitleCase(row.lift) : 'No workout name'}
              </div>
              <WorkoutRow variations={row.variations} />
            </div>
            ))}
          </div>

          <button
            className="fixed bottom-6 right-50 bg-[#6A994E] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-[#4d7038] transition-colors z-50"
            onClick={() => router.push(`/userHome`)}
          >
         Complete
        </button>
    </div>
  );
} 