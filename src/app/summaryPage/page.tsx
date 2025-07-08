"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import WorkoutRow from "../workout/WorkoutRow";
import { useRouter } from "next/navigation";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt: string) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

const motivationalMessages = [
  "Awesome work today—you're really putting in the effort!",
  "Solid session! You showed up and crushed it.",
  "You're getting stronger every time we train—keep it up!",
  "That was a tough one, but you handled it like a pro!",
  "Proud of the way you pushed through today. Great job!",
  "You're getting more confident and capable every week. Let's keep building!",
  "That was a big step forward—can't wait to see what you hit next!",
  "Your consistency is paying off. The progress is showing!",
  "Each rep, each set—it all adds up. You're doing the work.",
  "You're leveling up. One workout at a time!",
  "You pushed past the hard part. That's where real growth happens.",
  "Mental toughness on full display today. Respect.",
  "You didn't quit. That's what counts.",
  "That wasn't easy, and you crushed it anyway.",
  "Today was proof you've got grit. Let's keep that fire.",
  "You KILLED it! That energy was insane!",
  "Beast mode activated. That's how it's done!",
  "Straight up domination. Let's gooo!",
  "That was a power move! Let's ride this momentum.",
  "You didn't just show up—you showed OUT!",
  "Nice work today—progress comes from showing up like this.",
  "Another step forward. Stay steady, stay strong.",
  "Great focus and form today. Keep that mindset.",
  "Consistency over perfection—and you're nailing it.",
  "You did exactly what you needed to do today. Well done."
];

export default function SummaryPage() {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
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

  let rows = [];
  try {
    const data = searchParams.get("data");
    if (data) rows = JSON.parse(data);
  } catch (e) {
    rows = [];
  }
  const now = new Date();
  const dateString = now.toLocaleDateString();
  
  // Randomly select a motivational message
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 bg-white">
      <div className="text-xl font-normal mb-4 text-center">{randomMessage}</div>
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