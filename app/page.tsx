"use client";

import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<
    Record<string, { title: string; color: string }>
  >({});
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    color: string;
  } | null>(null);

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

  const addEvent = () => {
    if (!selectedDay || !title.trim()) return;

    const key = `${year}-${date.getMonth()}-${selectedDay}`;

    const newEvent = { title, color };

    setEvents({
      ...events,
      [key]: newEvent,
    });

    setSelectedEvent(newEvent);
    setTitle("");
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);

    const key = `${year}-${date.getMonth()}-${day}`;
    setSelectedEvent(events[key] || null);
  };

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white">

      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-56 p-6 border-r border-white/10 bg-white/10 backdrop-blur-xl">
        <h2 className="text-xl font-bold mb-6 tracking-wide">Offices</h2>

        <nav className="flex flex-col space-y-3">
          {["OVCAA", "OC", "NRK", "HR", "ICTO", "BUDJET", "SSC"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-left font-medium
                hover:bg-blue-600 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CALENDAR */}
      <div className="flex-1 p-6 flex flex-col items-center">

        <h1 className="text-5xl font-extrabold drop-shadow-lg mt-10">
          Campus Secretary
        </h1>
        <p className="text-lg opacity-80 mt-2">Plan your schedule with clarity</p>

        <div className="mt-10 w-full max-w-xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">

          {/* Month Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition shadow"
            >
              ⬅ Prev
            </button>

            <span className="text-2xl font-bold tracking-wide">
              {month} {year}
            </span>

            <button
              onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition shadow"
            >
              Next ➡
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-white/70">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 mt-3">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = `${year}-${date.getMonth()}-${day}`;
              const hasEvent = events[key];

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`relative flex items-center justify-center py-6 rounded-2xl text-sm font-medium cursor-pointer
                    bg-white/10 border border-white/10 transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-xl active:scale-95
                    ${selectedDay === day ? "ring-2 ring-white/60" : ""}`}
                >
                  {day}

                  {hasEvent && (
                    <span
                      className="absolute bottom-1 h-3 w-3 rounded-full"
                      style={{ backgroundColor: hasEvent.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR — ADD + VIEW AGENDA */}
      <aside className="hidden md:flex flex-col w-72 p-6 border-l border-white/10 bg-white/10 backdrop-blur-xl">

        <h2 className="text-xl font-bold mb-4 tracking-wide">Add Schedule</h2>

        <p className="text-sm opacity-70">Selected Date:</p>
        <div className="text-lg font-bold mb-5">
          {selectedDay ? `${month} ${selectedDay}, ${year}` : "None"}
        </div>

        {/* Title Input */}
        <label className="text-sm opacity-80">Meeting Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-2 mb-5 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
          placeholder="Ex: Admin Meeting"
        />

        {/* Color Picker */}
        <label className="text-sm opacity-80">Color Code</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 mt-2 mb-6 rounded cursor-pointer"
        />

        <button
          onClick={addEvent}
          className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg font-semibold"
        >
          Add Schedule
        </button>

        {/* MEETING AGENDA SECTION */}
        <h2 className="text-xl font-bold mt-10 tracking-wide">Meeting Agenda</h2>

        {!selectedDay && (
          <p className="mt-3 text-white/70">Click a date to view the agenda.</p>
        )}

        {selectedDay && !selectedEvent && (
          <p className="mt-3 text-white/70">No schedule for this day.</p>
        )}

        {selectedEvent && (
          <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold">Title</h3>
            <p className="mt-1 opacity-90">{selectedEvent.title}</p>

            <div className="flex items-center mt-3 gap-3">
              <span className="font-semibold">Color:</span>
              <div
                className="w-6 h-6 rounded-full border border-white/20"
                style={{ backgroundColor: selectedEvent.color }}
              ></div>
            </div>
          </div>
        )}

      </aside>
    </main>
  );
}
