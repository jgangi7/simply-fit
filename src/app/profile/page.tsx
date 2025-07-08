"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { user, updateMaxLifts, isLoading } = useAuth();
  const router = useRouter();
  const [bench, setBench] = useState(0);
  const [squat, setSquat] = useState(0);
  const [deadlift, setDeadlift] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setBench(user.maxLifts?.bench || 0);
      setSquat(user.maxLifts?.squat || 0);
      setDeadlift(user.maxLifts?.deadlift || 0);
    }
  }, [user]);

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

  const handleSave = () => {
    setIsSaving(true);
    updateMaxLifts({
      bench,
      squat,
      deadlift,
    });
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setBench(user.maxLifts?.bench || 0);
    setSquat(user.maxLifts?.squat || 0);
    setDeadlift(user.maxLifts?.deadlift || 0);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#0082c8]">Profile</h1>
          <button
            onClick={() => router.push("/userHome")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Back to Home
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#d4f4fc] rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#0082c8] mb-4">User Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Name:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Max Lifts */}
        <div className="bg-[#d4f4fc] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0082c8]">Max Lifts</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm bg-[#0082c8] text-white px-3 py-1 rounded hover:bg-[#0066a3]"
              >
                Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Bench Press */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Bench Press:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={bench}
                  onChange={(e) => setBench(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center"
                  min="0"
                />
              ) : (
                <span className="font-bold text-lg">
                  {bench > 0 ? `${bench} lbs` : "Not set"}
                </span>
              )}
            </div>

            {/* Squat */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Squat:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={squat}
                  onChange={(e) => setSquat(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center"
                  min="0"
                />
              ) : (
                <span className="font-bold text-lg">
                  {squat > 0 ? `${squat} lbs` : "Not set"}
                </span>
              )}
            </div>

            {/* Deadlift */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Deadlift:</span>
              {isEditing ? (
                <input
                  type="number"
                  value={deadlift}
                  onChange={(e) => setDeadlift(Number(e.target.value))}
                  className="w-20 px-2 py-1 border rounded text-center"
                  min="0"
                />
              ) : (
                <span className="font-bold text-lg">
                  {deadlift > 0 ? `${deadlift} lbs` : "Not set"}
                </span>
              )}
            </div>
          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-[#6A994E] text-white font-bold py-2 rounded hover:bg-[#4d7038] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white font-bold py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 