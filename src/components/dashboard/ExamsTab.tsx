import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  FileCheck, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { Exam, ExamResult } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { StatusIndicator } from '../common/Badge.js';

interface ExamsTabProps {
  exams: Exam[];
  examResults: ExamResult[];
}

export const ExamsTab: React.FC<ExamsTabProps> = ({ exams, examResults }) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(exams[0] || null);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);

  const currentResults = examResults.filter(r => selectedExam && r.examId === selectedExam.id);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Academic Assessment Board</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">Standardized Evaluation & Transcripts</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Examinations & Student Performance
          </h2>
        </div>
      </div>

      {/* Exam Term Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map(exam => {
          const isSelected = selectedExam?.id === exam.id;
          return (
            <div
              key={exam.id}
              onClick={() => setSelectedExam(exam)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-slate-900 bg-slate-50/70 ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {exam.academicYear} · {exam.term}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{exam.title}</h3>
                </div>
                <StatusIndicator status={exam.status} />
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {exam.startDate} to {exam.endDate}
                </span>
                <span>·</span>
                <span>{exam.grade}</span>
                <span>·</span>
                <span>{exam.subjects.length} Papers</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Exam Papers and Results */}
      {selectedExam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Papers & Proctors schedule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Proctored Subject Papers ({selectedExam.subjects.length})
            </h4>
            <div className="divide-y divide-slate-100">
              {selectedExam.subjects.map((sub, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{sub.subjectName}</p>
                    <p className="text-[11px] font-mono text-slate-400">Date: {sub.date}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-slate-900 font-medium">{sub.totalMarks} Marks</span>
                    <span className="block text-[10px] text-slate-400">Pass: {sub.passMarks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Student Scorecards */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Published Student Scorecards
                </h4>
                <p className="text-[11px] text-slate-500">Term transcripts and rankings</p>
              </div>
              <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {currentResults.length} Evaluated
              </span>
            </div>

            {currentResults.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Grading in progress for this examination term. Results will be published by faculty proctors.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 text-xs">
                {currentResults.map(res => (
                  <div
                    key={res.id}
                    onClick={() => setSelectedResult(res)}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{res.studentName}</span>
                        {res.rank && (
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">
                            Rank #{res.rank}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {res.grade} · Section {res.section} · {res.marks.length} Subjects
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-base font-bold font-mono text-slate-900">
                          {res.percentage}%
                        </span>
                        <span className="block text-[11px] font-semibold text-emerald-700">
                          Grade {res.overallGrade}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-800 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {selectedResult && (
        <Modal
          isOpen={!!selectedResult}
          onClose={() => setSelectedResult(null)}
          title={`Official Report Card: ${selectedResult.studentName}`}
          subtitle={`${selectedResult.examTitle} · Percentage: ${selectedResult.percentage}% · Grade: ${selectedResult.overallGrade}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Marks</span>
                <span className="font-bold text-slate-900">{selectedResult.obtainedMarks} / {selectedResult.totalMarks}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Class Rank</span>
                <span className="font-bold text-slate-900">#{selectedResult.rank}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className="font-bold text-emerald-700">Passed (Distinction)</span>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                <tr>
                  <th className="py-2">Subject Name</th>
                  <th className="py-2 text-right">Obtained</th>
                  <th className="py-2 text-right">Max</th>
                  <th className="py-2 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedResult.marks.map((m, idx) => (
                  <tr key={idx}>
                    <td className="py-2 font-medium text-slate-900">{m.subjectName}</td>
                    <td className="py-2 text-right font-mono text-slate-900">{m.obtainedMarks}</td>
                    <td className="py-2 text-right font-mono text-slate-500">{m.totalMarks}</td>
                    <td className="py-2 text-right font-mono font-semibold text-emerald-700">{m.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedResult(null)}>
                Close Transcript
              </Button>
              <Button size="sm" variant="primary" onClick={() => window.print()}>
                Print Transcript
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
