"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getCalendarRows(month: number, year: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || day > daysInMonth) {
        row.push(null);
      } else {
        row.push(day++);
      }
    }
    rows.push(row);
  }
  return rows;
}

export default function UserHome() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const today = new Date();
  const [date, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const calendarRows = getCalendarRows(date.month, date.year);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const totalLifts = (user?.maxLifts?.bench || 0) + (user?.maxLifts?.squat || 0) + (user?.maxLifts?.deadlift || 0);

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

  // Extract month name, day, and year from today
  const monthName = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();
  const fullYear = today.getFullYear();

  const handlePrevYear = () => setDate(d => ({ ...d, year: d.year - 1 }));
  const handleNextYear = () => setDate(d => ({ ...d, year: d.year + 1 }));
  const handlePrevMonth = () => {
    setDate(({ month, year }) => {
      if (month === 0) {
        return { month: 11, year: year - 1 };
      }
      return { month: month - 1, year };
    });
  };
  const handleNextMonth = () => {
    setDate(({ month, year }) => {
      if (month === 11) {
        return { month: 0, year: year + 1 };
      }
      return { month: month + 1, year };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Sign Out
        </button>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0082c8] mt-8 mb-8 text-center">
        Welcome {user.name || user.email}
      </h1>
      <div className="flex flex-row justify-center gap-8 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">Squat</div>
          <div className="font-bold text-xl text-[#0082c8]">
            {user.maxLifts?.squat > 0 ? `${user.maxLifts.squat} lbs` : "Not set"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Bench</div>
          <div className="font-bold text-xl text-[#0082c8]">
            {user.maxLifts?.bench > 0 ? `${user.maxLifts.bench} lbs` : "Not set"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Deadlift</div>
          <div className="font-bold text-xl text-[#0082c8]">
            {user.maxLifts?.deadlift > 0 ? `${user.maxLifts.deadlift} lbs` : "Not set"}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-8 mb-10">
        <div className="text-center">
          <div className="text-sm text-gray-600">Total</div>
          <div className="font-bold text-xl text-[#0082c8]">
            {`${totalLifts} lbs`}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold text-[#0082c8] mb-4">Today is {`${monthName} ${day}, ${fullYear}`}</h2>
      <div className="bg-[#d4f4fc] rounded p-4 mb-8 flex flex-col items-center w-[260px]">
        <div className="flex flex-row justify-between w-full mb-2 items-center">
          <button className="text-lg font-bold text-[#0082c8]" onClick={handlePrevYear}>{'<<'}</button>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handlePrevMonth}>{'<'}</button>
          <span className="font-bold">{`${monthNames[date.month]} ${date.year}`}</span>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handleNextMonth}>{'>'}</button>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handleNextYear}>{'>>'}</button>
        </div>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <span key={d} className="text-xs font-bold text-[#0082c8] text-center">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarRows.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((d, j) =>
                d ? (
                  <span
                    key={j}
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold
                      ${'bg-[#bde8f7] text-[#0082c8]'}
                      ${d === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear() ? 'border border-black' : ''}
                    `}
                  >
                    {d}
                  </span>
                ) : (
                  <span key={j} className="w-7 h-7" />
                )
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Link href="/workout" className="bg-[#d4f4fc] text-[#0082c8] font-bold rounded px-12 py-2 shadow hover:bg-[#bde8f7] transition-colors text-center">
          Start Workout
        </Link>
        <Link href="/profile" className="bg-[#f0f0f0] text-gray-700 font-bold rounded px-12 py-2 shadow hover:bg-[#e0e0e0] transition-colors text-center">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}