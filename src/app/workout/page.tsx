"use client";

import React, { useState } from "react";
import Timer from "./Timer";
import WorkoutRow from "./WorkoutRow";
import WorkoutRowFormModal from "./WorkoutRowFormModal";

// Define a type for the row data
interface WorkoutRowData {
  sets?: string;
  reps?: string;
  lbs?: string;
  dropSet?: boolean;
  toFailure?: boolean;
  lift?: string;
  weight?: string;
}

const INITIAL_ROWS: WorkoutRowData[] = [
  {},
  {},
  {},
];

export default function Workout() {
  const [rows, setRows] = useState<WorkoutRowData[]>(INITIAL_ROWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handlePlusClick = (i: number) => {
    setEditingIndex(i);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const handleModalSubmit = (values: any) => {
    setRows(prev => prev.map((row, idx) => idx === editingIndex ? values : row));
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
              <div className="bg-[#36c3e6] rounded px-4 py-3 font-bold text-2xl flex-1 text-black max-w-[40%] text-center">
                {row.lift || '{workoutName}'}
              </div>
              <div onClick={() => !row.sets && handlePlusClick(i)} style={{ cursor: !row.sets ? 'pointer' : 'default' }}>
                <WorkoutRow index={i} {...row} />
              </div>
            </div>
          ))}
        </div>
        {/* Add Row Button */}
        <button className="bg-[#36c3e6] text-black font-bold rounded w-full py-4 text-xl flex items-center justify-center max-h-[10px]">
          +
        </button>
        <WorkoutRowFormModal
          open={modalOpen}
          initialValues={editingIndex !== null ? rows[editingIndex] : {}}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
} 