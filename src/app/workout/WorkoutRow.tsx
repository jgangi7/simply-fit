import React from "react";

interface Variation {
  sets?: string;
  reps?: string;
  lbs?: string;
  dropSet?: boolean;
  toFailure?: boolean;
}

interface WorkoutRowProps {
  variations: Variation[];
  onAddVariation?: () => void;
}

export default function WorkoutRow({ variations, onAddVariation }: WorkoutRowProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {(
        <>
          {variations.map((v, idx) => (
            <span key={idx} className="bg-[#0099c8] text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm text-center">
              {v.lbs}<br />  {v.sets} x {v.reps}
            </span> 
          ))}
          {onAddVariation && (
            <span className="bg-[#bde8f7] text-[#0082c8] font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-2 cursor-pointer" onClick={onAddVariation}>+</span>
          )}
        </>
      )}
    </div>
  );
} 