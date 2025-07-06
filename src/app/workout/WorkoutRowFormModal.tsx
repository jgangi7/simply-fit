import React, { useState } from "react";

interface WorkoutRowFormModalProps {
  open: boolean;
  initialValues?: {
    toFailure?: boolean;
    dropSet?: boolean;
    lift?: string;
    weight?: string;
    sets?: string;
    reps?: string;
    dropsetWeight?: string;
    dropsetReps?: string;
  };
  onClose: () => void;
  onSubmit: (values: {
    toFailure: boolean;
    dropSet: boolean;
    lift: string;
    weight: string;
    sets: string;
    reps: string;
    dropsetWeight?: string;
    dropsetReps?: string;
  }) => void;
}

export default function WorkoutRowFormModal({ open, initialValues, onClose, onSubmit }: WorkoutRowFormModalProps) {
  const [toFailure, setToFailure] = useState(initialValues?.toFailure || false);
  const [dropSet, setDropSet] = useState(initialValues?.dropSet || false);
  const [lift, setLift] = useState(initialValues?.lift || "");
  const [weight, setWeight] = useState(initialValues?.weight || "");
  const [sets, setSets] = useState(initialValues?.sets || "");
  const [reps, setReps] = useState(initialValues?.reps || "");
  const [dropsetWeight, setDropsetWeight] = useState(initialValues?.dropsetWeight || "");
  const [dropsetReps, setDropsetReps] = useState(initialValues?.dropsetReps || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
      <div className="bg-[#0077b6] p-8 rounded shadow-lg min-w-[320px] relative flex flex-col gap-4">
        <button className="absolute top-2 left-2 text-black text-xl" onClick={onClose}>&#10005;</button>
        <div className="flex flex-row items-center mb-2">
          <label className="flex-1 text-white">To failure?</label>
          <select className="w-32 text-black bg-white" value={toFailure ? "Yes" : "No"} onChange={e => setToFailure(e.target.value === "Yes")}> 
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div className="flex flex-row items-center mb-2">
          <label className="flex-1 text-white">Dropset?</label>
          <select className="w-32 text-black bg-white" value={dropSet ? "Yes" : "No"} onChange={e => setDropSet(e.target.value === "Yes")}> 
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div className="flex flex-row items-center mb-2">
          <label className="flex-1 text-white">Lift</label>
          <input className="w-32 text-black bg-white" value={lift} onChange={e => setLift(e.target.value)} />
        </div>
        <div className="flex flex-row items-center mb-2">
          <label className="flex-1 text-white">Weight</label>
          <input className="w-32 text-black bg-white" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        {!toFailure && (
          <div className="flex flex-row items-center mb-2">
            <label className="flex-1 text-white">Sets</label>
            <input className="w-32 text-black bg-white" value={sets} onChange={e => setSets(e.target.value)} />
          </div>
        )}
        {!toFailure && (
          <div className="flex flex-row items-center mb-2">
            <label className="flex-1 text-white">Repetitions</label>
            <input className="w-32 text-black bg-white" value={reps} onChange={e => setReps(e.target.value)} />
          </div>
        )}
        {dropSet && (
          <>
            <div className="flex flex-row items-center mb-2">
              <label className="flex-1 text-white">Dropset Weight</label>
              <input className="w-32 text-black bg-white" value={dropsetWeight} onChange={e => setDropsetWeight(e.target.value)} />
            </div>
            <div className="flex flex-row items-center mb-2">
              <label className="flex-1 text-white mx-1">Dropset Repetitions</label>
              <input className="w-32 text-black bg-white" value={dropsetReps} onChange={e => setDropsetReps(e.target.value)} />
            </div>
          </>
        )}
        <button
          className="bg-[#7ca16b] text-black font-bold rounded w-32 py-2 mt-4 self-end"
          onClick={() => onSubmit({ toFailure, dropSet, lift, weight, sets, reps, dropsetWeight, dropsetReps })}
        >
          Begin
        </button>
      </div>
    </div>
  );
} 