import React from "react";
import Link from "next/link";

export default function UserHome() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const day = today.getDate();
  const daysInMonth = 31; // For July
  const weekDays = [0, 1, 2, 3, 4, 5, 6];
  // Generate a simple calendar grid for July
  const calendarRows = [];
  let dayNum = 1;
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if (dayNum <= daysInMonth) {
        row.push(dayNum);
        dayNum++;
      } else {
        row.push(null);
      }
    }
    calendarRows.push(row);
  }

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
      <h2 className="text-xl font-bold text-[#0082c8] mb-4">Today is {`${month} ${day}, ${year}`}</h2>
      <div className="bg-[#d4f4fc] rounded p-4 mb-8 flex flex-col items-center w-[260px]">
        <div className="flex flex-row justify-between w-full mb-2">
          <button className="text-lg font-bold text-[#0082c8]">&lt;</button>
          <span className="font-bold">{`< ${month} >`}</span>
          <button className="text-lg font-bold text-[#0082c8]">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarRows.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((d, j) =>
                d ? (
                  <span
                    key={j}
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${d % 2 === 0 ? 'bg-[#bde8f7] text-[#0082c8]' : 'bg-[#b6d7a8] text-[#222]'}`}
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