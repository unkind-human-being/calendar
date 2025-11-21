"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AddSchedule() {
  const params = useSearchParams();
  const selectedDay = params.get("day");

  const [date, setDate] = useState(new Date());
  const [meetingTitle, setMeetingTitle] = useState("");

  const [selectedColor, setSelectedColor] = useState("#22c55e"); // green default
  const [participantType, setParticipantType] = useState("All");
  const [showParticipantList, setShowParticipantList] = useState(false);

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

  const participants = ["Department", "Office", "All"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white p-10">

      <h1 className="text-5xl font-extrabold text-center mb-10">
        Add Schedule
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SIDE – Calendar */}
        <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">

          {/* Month Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30"
            >
              ← Prev
            </button>

            <span className="text-2xl font-bold">{month} {year}</span>

            <button
              onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30"
            >
              Next →
            </button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-3 text-center text-sm font-semibold text-white/70">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3 mt-3">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  className={`py-6 rounded-2xl text-center border text-white/90
                    ${day == Number(selectedDay)
                      ? "bg-blue-600 border-blue-400 shadow-xl scale-105"
                      : "bg-white/10 border-white/10 hover:bg-blue-500 hover:scale-105"
                    }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE – Schedule Form */}
        <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">

          <h2 className="text-2xl font-bold mb-4">Schedule Details</h2>

          <p className="text-white/70 text-sm mb-4">
            Selected Date:{" "}
            <span className="font-bold text-white">
              {selectedDay ? `${month} ${selectedDay}, ${year}` : "None"}
            </span>
          </p>

          {/* Meeting Title */}
          <label className="text-sm opacity-80">Meeting Title</label>
          <input
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none mb-6"
            placeholder="Enter meeting title"
          />

          {/* Participant Dropdown */}
          <label className="text-sm opacity-80">Participants</label>
          <div className="relative mb-6">
            <button
              onClick={() => setShowParticipantList(!showParticipantList)}
              className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow font-semibold flex justify-between items-center"
            >
              {participantType} ▼
            </button>

            {showParticipantList && (
              <div className="absolute w-full mt-2 bg-white/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg z-10">
                {participants.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setParticipantType(p);
                      setShowParticipantList(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-white/30 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Selector */}
          <label className="text-sm opacity-80">Choose Color</label>
          <div className="flex gap-4 mt-2 mb-6">
            {["#22c55e", "#3b82f6"].map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-xl cursor-pointer border-2 ${
                  selectedColor === color
                    ? "border-white"
                    : "border-transparent opacity-60"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg text-white">
            Save Schedule
          </button>
        </div>
      </div>

    </main>
  );
}
