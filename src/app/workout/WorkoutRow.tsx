import React from "react";

interface WorkoutRowProps {
  index: number;
  sets?: string;
  reps?: string;
  lbs?: string;
  dropSet?: boolean;
  toFailure?: boolean;
}

export default function WorkoutRow({ index, sets, reps, lbs, dropSet, toFailure }: WorkoutRowProps) {
  // Check if any required props are missing
  const hasAllProps = sets !== undefined && reps !== undefined && lbs !== undefined && 
                     dropSet !== undefined && toFailure !== undefined;

  return (
    <div className="flex flex-row gap-2 items-center">
      {!hasAllProps ? (
        <span className="bg-[#bde8f7] text-[#0082c8] font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-2 cursor-pointer">+</span>
      ) : (
        <>
          {index === 2 ? (
            <span className="bg-[#e74c3c] text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm">
              {reps}<br />{lbs}
            </span>
          ) : (
            [1, 2, 3].map((b) => (
              <span key={b} className="bg-[#0099c8] text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm">
                {sets}<br />{reps}<br />{lbs}
              </span>
            ))
          )}
          <span className="bg-[#bde8f7] text-[#0082c8] font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-2 cursor-pointer">+</span>
          {index === 2 && (
            <span className="text-3xl mx-2">→</span>
          )}
        </>
      )}
    </div>
  );
} 