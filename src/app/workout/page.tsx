"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Timer from "./Timer";
import WorkoutRow from "./WorkoutRow";
import WorkoutRowFormModal from "./WorkoutRowFormModal";
import CalculateModal from "./CalculateModal";
import Toast from "../../components/Toast";

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
  const { user, isLoading, updateMaxLift } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<WorkoutRowData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'row' | 'variation'>("row");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [calculateModalOpen, setCalculateModalOpen] = useState(false);
  const [running, setRunning] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="text-[#0082c8] text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

  const checkAndUpdateMaxLift = (liftName: string, weight: number) => {
    const liftLower = liftName.toLowerCase();
    
    // Check if it's a bench, squat, or deadlift exercise
    if (liftLower.includes('bench') || liftLower.includes('press')) {
      const currentMax = user?.maxLifts?.bench || 0;
      if (weight > currentMax) {
        updateMaxLift('bench', weight);
        setToastMessage(`New bench press max: ${weight} lbs! 🎉`);
        setShowToast(true);
      }
    } else if (liftLower.includes('squat')) {
      const currentMax = user?.maxLifts?.squat || 0;
      if (weight > currentMax) {
        updateMaxLift('squat', weight);
        setToastMessage(`New squat max: ${weight} lbs! 🎉`);
        setShowToast(true);
      }
    } else if (liftLower.includes('deadlift') || liftLower.includes('dead')) {
      const currentMax = user?.maxLifts?.deadlift || 0;
      if (weight > currentMax) {
        updateMaxLift('deadlift', weight);
        setToastMessage(`New deadlift max: ${weight} lbs! 🎉`);
        setShowToast(true);
      }
    }
  };

  const handleModalSubmit = (values: any) => {
    const { weight, lift, ...rest } = values;
    const variation = { ...rest, lbs: weight };
    
    // Check if this exercise should update max lifts
    const weightNum = parseFloat(weight);
    if (!isNaN(weightNum) && weightNum > 0) {
      checkAndUpdateMaxLift(lift, weightNum);
    }
    
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
          <Timer running={running}/>
          <button className="bg-[#d4f4fc] text-[#0082c8] hover:bg-[#bde8f7] font-bold px-6 py-2 rounded" onClick={() => setCalculateModalOpen(true)}>Calculate</button>
        </div>
        {/* Workout Rows */}
        <div className="flex flex-col gap-6 w-full mb-8">
          {rows.length<1 ? "Begin your workout!": rows.map((row, i) => (
            <div key={i} className="flex flex-row items-center gap-4">
              <div className="bg-[#2c9fbb] rounded px-4 py-3 font-bold text-xl flex-1 text-black max-w-[40%] text-center">
                {row.lift ? toTitleCase(row.lift) : '{workoutName}'}
              </div>
              <WorkoutRow variations={row.variations} onAddVariation={() => handleAddVariationClick(i)} />
            </div>
          ))}
        </div>
        {/* Add Row Button */}
        <button className="bg-[#d4f4fc] hover:bg-[#bde8f7] text-[#0082c8] font-bold rounded w-full py-4 text-xl flex items-center justify-center max-h-[10px]" onClick={handleAddRowClick}>
          +
        </button>
        <button
         className="fixed bottom-6 left-50 bg-[#e74c3c] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-[#c0392b] transition-colors z-50"
         onClick={() => router.push('/userHome')}
         disabled={!running}
       >
         Cancel
       </button>
       <button
         className="fixed bottom-6 right-50 bg-[#6A994E] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-[#4d7038] transition-colors z-50"
         onClick={() => router.push(`/summaryPage?data=${encodeURIComponent(JSON.stringify(rows))}`)}
         disabled={!running}
       >
         Finish
        </button>
        <WorkoutRowFormModal
          open={modalOpen}
          initialValues={{}}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
        <CalculateModal open={calculateModalOpen} onClose={() => setCalculateModalOpen(false)} />
        <Toast 
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          type="success"
        />
      </div>
    </div>
  );
} 