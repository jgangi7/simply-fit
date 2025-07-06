"use client";
import React, { useState } from "react";
import Link from "next/link";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getCalendarRows(month: number, year: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = [];
  let current = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push(current > 0 && current <= daysInMonth ? current : null);
      current++;
    }
    rows.push(row);
    if (current > daysInMonth) break;
  }
  return rows;
}

export default function UserHome() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const calendarRows = getCalendarRows(month, year);

  // Extract month name, day, and year from today
  const monthName = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();
  const fullYear = today.getFullYear();

  const handlePrevYear = () => setYear(y => y - 1);
  const handleNextYear = () => setYear(y => y + 1);
  const handlePrevMonth = () => setMonth(m => {
    if (m === 0) {
      setYear(y => y - 1);
      return 11;
    }
    return m - 1;
  });
  const handleNextMonth = () => setMonth(m => {
    if (m === 11) {
      setYear(y => y + 1);
      return 0;
    }
    return m + 1;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0082c8] mt-8 mb-8 text-center">
        Welcome {'{username}'}
      </h1>
      <div className="flex flex-row justify-center gap-8 mb-10">
        <span className="font-bold text-xl">{'{squat}'}</span>
        <span className="font-bold text-xl">{'{bench}'}</span>
        <span className="font-bold text-xl">{'{dead}'}</span>
      </div>
      <h2 className="text-xl font-bold text-[#0082c8] mb-4">Today is {`${monthName} ${day}, ${fullYear}`}</h2>
      <div className="bg-[#d4f4fc] rounded p-4 mb-8 flex flex-col items-center w-[260px]">
        <div className="flex flex-row justify-between w-full mb-2 items-center">
          <button className="text-lg font-bold text-[#0082c8]" onClick={handlePrevYear}>{'<<'}</button>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handlePrevMonth}>{'<'}</button>
          <span className="font-bold">{`${monthNames[month]} ${year}`}</span>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handleNextMonth}>{'>'}</button>
          <button className="text-lg font-bold text-[#0082c8]" onClick={handleNextYear}>{'>>'}</button>
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
                      ${d === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'border border-black' : ''}
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
      <Link href="/workout" className="bg-[#d4f4fc] text-[#0082c8] font-bold rounded px-12 py-2 mt-2 shadow hover:bg-[#bde8f7] transition-colors text-center">
        Start
      </Link>
    </div>
  );
}