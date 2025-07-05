"use client";

import React, { useState } from "react";
import Timer from "./Timer";
import WorkoutRow from "./WorkoutRow";
import WorkoutRowFormModal from "./WorkoutRowFormModal";

interface Variation {
  sets?: string;
  reps?: string;
  lbs?: string;
  dropSet?: boolean;
  toFailure?: boolean;
}

interface WorkoutRowData {
  lift?: string;
  variations: Variation[];
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function Workout() {
  const [rows, setRows] = useState<WorkoutRowData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'row' | 'variation'>("row");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Open modal to add a new row
  const handleAddRowClick = () => {
    setModalMode("row");
    setEditingIndex(null);
    setModalOpen(true);
  };

  // Open modal to add a variation to an existing row
  const handleAddVariationClick = (rowIdx: number) => {
    setModalMode("variation");
    setEditingIndex(rowIdx);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleModalSubmit = (values: any) => {
    const { weight, lift, ...rest } = values;
    const variation = { ...rest, lbs: weight };
    if (modalMode === "row") {
      setRows(prev => [...prev, { lift, variations: [variation] }]);
    } else if (modalMode === "variation" && editingIndex !== null) {
      setRows(prev => prev.map((row, idx) =>
        idx === editingIndex
          ? { ...row, variations: [...row.variations, variation] }
          : row
      ));
    }
    setModalOpen(false);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Header: Timer and Calculate button */}
        <div className="flex flex-row items-center w-full justify-between mb-8">
          <Timer />
          <button className="bg-[#0a1857] text-white font-bold px-6 py-2 rounded">Calculate</button>
        </div>
        {/* Workout Rows */}
        <div className="flex flex-col gap-6 w-full mb-8">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-row items-center gap-4">
              <div className="bg-[#36c3e6] rounded px-4 py-3 font-bold text-xl flex-1 text-black max-w-[40%] text-center">
                {row.lift ? toTitleCase(row.lift) : '{workoutName}'}
              </div>
              <WorkoutRow index={i} variations={row.variations} onAddVariation={() => handleAddVariationClick(i)} />
            </div>
          ))}
        </div>
        {/* Add Row Button */}
        <button className="bg-[#36c3e6] text-black font-bold rounded w-full py-4 text-xl flex items-center justify-center max-h-[10px]" onClick={handleAddRowClick}>
          +
        </button>
        <WorkoutRowFormModal
          open={modalOpen}
          initialValues={{}}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
} 