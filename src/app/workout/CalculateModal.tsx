import React, { useState } from "react";

export default function CalculateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [liftType, setLiftType] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg min-w-[340px] flex flex-col items-center relative">
        <button className="absolute top-2 right-2 text-black text-xl" onClick={onClose}>&#10005;</button>
        <div className="text-lg font-semibold mb-6 text-center">Calculate Rep Range Max</div>
        <form className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-row items-center w-full">
            <label className="w-1/2 text-black text-sm">Lift type</label>
            <input
              className="w-1/2 bg-[#d2f3fc] rounded shadow px-2 py-1 outline-none"
              value={liftType}
              onChange={e => setLiftType(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center w-full">
            <label className="w-1/2 text-black text-sm">Weight</label>
            <input
              className="w-1/2 bg-[#d2f3fc] rounded shadow px-2 py-1 outline-none"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center w-full">
            <label className="w-1/2 text-black text-sm">Repetitions</label>
            <input
              className="w-1/2 bg-[#d2f3fc] rounded shadow px-2 py-1 outline-none"
              value={reps}
              onChange={e => setReps(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center w-full">
            <label className="w-1/2 text-black text-sm">Body Weight</label>
            <input
              className="w-1/2 bg-[#d2f3fc] rounded shadow px-2 py-1 outline-none"
              value={bodyWeight}
              onChange={e => setBodyWeight(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full mt-4 bg-[#0077b6] text-black font-semibold rounded shadow py-2 text-center text-base"
            style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
          >
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
} 