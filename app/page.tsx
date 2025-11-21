"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Modal open state
  const [showMeeting, setShowMeeting] = useState(false);

  // Example invited departments
  const invitedList = ["CAS", "CCS"];

  // Track attendance
  const [attendance, setAttendance] = useState<Record<string, string>>({
    CAS: "Pending",
    CCS: "Pending",
  });

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

  const openMeeting = (day: number) => {
    setSelectedDay(day);
    setShowMeeting(true);
  };

  const handleResponse = (dept: string, response: "Accepted" | "Declined") => {
    setAttendance((prev) => ({
      ...prev,
      [dept]: response,
    }));
  };

  const totalAccepted = Object.values(attendance).filter(
    (v) => v === "Accepted"
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white p-10">

      {/* TITLE SECTION */}
      <h1 className="text-5xl font-extrabold text-center">Campus Secretary</h1>
      <p className="text-center text-lg opacity-80 mt-2">
        Select a day to view meeting details
      </p>

      {/* ADD SCHEDULE BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push(`/add_schedule?day=${selectedDay || ""}`)}
          className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow font-semibold"
        >
          + Add Schedule
        </button>
      </div>

      {/* CALENDAR */}
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-3xl p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">

          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() =>
                setDate(new Date(date.setMonth(date.getMonth() - 1)))
              }
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30"
            >
              ← Prev
            </button>

            <span className="text-2xl font-bold">
              {month} {year}
            </span>

            <button
              onClick={() =>
                setDate(new Date(date.setMonth(date.getMonth() + 1)))
              }
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30"
            >
              Next →
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-3 text-center text-sm font-semibold text-white/70">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-3 mt-3">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  onClick={() => openMeeting(day)}
                  className={`py-6 rounded-2xl text-center cursor-pointer transition-all border
                    ${
                      selectedDay === day
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
      </div>

      {/* ------------------------------------------------------------
          MEETING INVITATION POPUP 
      ------------------------------------------------------------ */}
      {showMeeting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/10 border border-white/20 p-8 rounded-3xl w-full max-w-lg shadow-2xl">

            <h2 className="text-3xl font-bold text-center">Meeting Invitations</h2>
            <p className="text-center opacity-80 mt-2">
              Date Selected: <span className="font-bold">{selectedDay}</span>
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Invited Departments</h3>

              <div className="flex flex-col gap-3">
                {invitedList.map((dept) => (
                  <div
                    key={dept}
                    className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-xl border border-white/10"
                  >
                    <span className="font-semibold">{dept}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResponse(dept, "Accepted")}
                        className={`px-3 py-1 rounded-lg ${
                          attendance[dept] === "Accepted"
                            ? "bg-green-500"
                            : "bg-green-700 hover:bg-green-600"
                        }`}
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleResponse(dept, "Declined")}
                        className={`px-3 py-1 rounded-lg ${
                          attendance[dept] === "Declined"
                            ? "bg-red-500"
                            : "bg-red-700 hover:bg-red-600"
                        }`}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center mt-6 text-lg font-semibold">
                Total Attending:{" "}
                <span className="text-green-400">{totalAccepted}</span>
              </p>
            </div>

            <button
              className="mt-6 w-full py-3 bg-blue-600 rounded-xl hover:bg-blue-700 font-bold"
              onClick={() => setShowMeeting(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </main>
  );
}
