import React from "react";

interface Variation {
  sets?: string;
  reps?: string;
  lbs?: string;
  dropSet?: boolean;
  toFailure?: boolean;
  dropsetWeight?: string;
  dropsetReps?: string;
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
            v.dropSet && v.dropsetWeight && v.dropsetReps ? (
              <React.Fragment key={idx}>
                <span
                  className={`${v.toFailure ? 'bg-[#e74c3c]' : 'bg-[#0099c8]'} text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm text-center`}
                >
                  {v.lbs}
                  {!v.toFailure && <><br />{v.sets} x {v.reps}</>}
                </span>
                <span className="text-xl">→</span>
                <span
                  className={`${v.toFailure ? 'bg-[#e74c3c]' : 'bg-[#0099c8]'} text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm text-center`}
                >
                  {v.dropsetWeight}
                  {!v.toFailure && <><br />1 x {v.dropsetReps}</>}
                </span>
              </React.Fragment>
            ) : (
              <span
                key={idx}
                className={`${v.toFailure ? 'bg-[#e74c3c]' : 'bg-[#0099c8]'} text-white font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm text-center`}
              >
                {v.lbs}
                {!v.toFailure && <><br />{v.sets} x {v.reps}</>}
              </span>
            )
          ))}
          {onAddVariation && (
            <span className="bg-[#bde8f7] text-[#0082c8] font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-2 cursor-pointer" onClick={onAddVariation}>+</span>
          )}
        </>
      )}
    </div>
  );
} 