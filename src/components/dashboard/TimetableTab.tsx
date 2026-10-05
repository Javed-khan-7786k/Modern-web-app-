import React, { useState } from 'react';
import { Clock, MapPin, UserCheck, BookOpen } from 'lucide-react';

export const TimetableTab: React.FC = () => {
  const [selectedCohort, setSelectedCohort] = useState('Grade 11 - Section A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const periods = [
    { period: 'Period 1', time: '08:30 - 09:20' },
    { period: 'Period 2', time: '09:25 - 10:15' },
    { period: 'Period 3', time: '10:30 - 11:20' },
    { period: 'Period 4', time: '11:25 - 12:15' },
    { period: 'Period 5', time: '13:15 - 14:05' },
    { period: 'Period 6', time: '14:10 - 15:00' },
  ];

  const scheduleGrid: Record<string, { subject: string; teacher: string; room: string }[]> = {
    Monday: [
      { subject: 'AP Physics C', teacher: 'Prof. Vance', room: 'Sci-104' },
      { subject: 'Multivariable Calc', teacher: 'Dr. Sterling', room: 'Math-201' },
      { subject: 'World Literature', teacher: 'Ms. Holloway', room: 'Hum-302' },
      { subject: 'Inorganic Chem', teacher: 'Dr. Lin', room: 'Lab-A' },
      { subject: 'Physical Education', teacher: 'Coach Adams', room: 'Gym' },
      { subject: 'Academic Study Hall', teacher: 'Faculty Staff', room: 'Commons' },
    ],
    Tuesday: [
      { subject: 'Multivariable Calc', teacher: 'Dr. Sterling', room: 'Math-201' },
      { subject: 'AP Physics C', teacher: 'Prof. Vance', room: 'Sci-104' },
      { subject: 'Inorganic Chem Lab', teacher: 'Dr. Lin', room: 'Lab-A' },
      { subject: 'Inorganic Chem Lab', teacher: 'Dr. Lin', room: 'Lab-A' },
      { subject: 'French Literature', teacher: 'Mme. Dupont', room: 'Lang-12' },
      { subject: 'Computer Science', teacher: 'Mr. Gupta', room: 'Core-08' },
    ],
    Wednesday: [
      { subject: 'World Literature', teacher: 'Ms. Holloway', room: 'Hum-302' },
      { subject: 'AP Physics C', teacher: 'Prof. Vance', room: 'Sci-104' },
      { subject: 'Multivariable Calc', teacher: 'Dr. Sterling', room: 'Math-201' },
      { subject: 'Philosophy & Ethics', teacher: 'Dr. Aris', room: 'Hum-304' },
      { subject: 'Robotics Seminar', teacher: 'Prof. Vance', room: 'Maker-01' },
      { subject: 'Music Ensemble', teacher: 'Dr. Moreau', room: 'Arts-10' },
    ],
    Thursday: [
      { subject: 'AP Physics Lab', teacher: 'Prof. Vance', room: 'Sci-104' },
      { subject: 'AP Physics Lab', teacher: 'Prof. Vance', room: 'Sci-104' },
      { subject: 'Inorganic Chem', teacher: 'Dr. Lin', room: 'Lab-A' },
      { subject: 'World Literature', teacher: 'Ms. Holloway', room: 'Hum-302' },
      { subject: 'Computer Science', teacher: 'Mr. Gupta', room: 'Core-08' },
      { subject: 'Advisory Council', teacher: 'Dean Rostova', room: 'Hall-B' },
    ],
    Friday: [
      { subject: 'Multivariable Calc', teacher: 'Dr. Sterling', room: 'Math-201' },
      { subject: 'Inorganic Chem', teacher: 'Dr. Lin', room: 'Lab-A' },
      { subject: 'French Literature', teacher: 'Mme. Dupont', room: 'Lang-12' },
      { subject: 'World Literature', teacher: 'Ms. Holloway', room: 'Hum-302' },
      { subject: 'Assembly & Colloquium', teacher: 'All Faculty', room: 'Auditorium' },
      { subject: 'Student Clubs', teacher: 'Club Leads', room: 'Campus' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Academic Bell Schedule</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">6 Instructional Periods Daily</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Master Cohort & Faculty Timetable
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCohort}
            onChange={e => setSelectedCohort(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none"
          >
            <option value="Grade 11 - Section A">Grade 11 - Section A (Junior)</option>
            <option value="Grade 12 - Section A">Grade 12 - Section A (Senior)</option>
            <option value="Grade 10 - Section B">Grade 10 - Section B (Sophomore)</option>
            <option value="Grade 9 - Section B">Grade 9 - Section B (Freshman)</option>
          </select>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-mono text-[11px]">
            <tr>
              <th className="py-3 px-4 w-36">Bell Period</th>
              {days.map(day => (
                <th key={day} className="py-3 px-4">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {periods.map((p, pIdx) => (
              <tr key={p.period} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-4 bg-slate-50/40 font-mono">
                  <span className="font-semibold text-slate-900 block">{p.period}</span>
                  <span className="text-[10px] text-slate-400 block">{p.time}</span>
                </td>
                {days.map(day => {
                  const slot = scheduleGrid[day]?.[pIdx];
                  if (!slot) return <td key={day} className="p-3 text-slate-300">—</td>;
                  return (
                    <td key={day} className="py-3 px-4">
                      <p className="font-semibold text-slate-900 leading-tight">{slot.subject}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span>{slot.teacher}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-500">{slot.room}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
