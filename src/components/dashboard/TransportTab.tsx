import React from 'react';
import { Bus, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';
import { TransportRoute } from '../../types/index.js';

interface TransportTabProps {
  routes: TransportRoute[];
}

export const TransportTab: React.FC<TransportTabProps> = ({ routes }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Student Transit & Campus Fleet</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{routes.length} Active Bus Routes</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Transport Routes & Vehicle Telemetry
          </h2>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map(r => (
          <div key={r.id} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {r.routeNumber}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  On Schedule
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">{r.routeName}</h3>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Vehicle Plate</span>
                  <span className="font-semibold text-slate-800">{r.vehicleNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Ridership Load</span>
                  <span className="font-semibold text-slate-800">{r.assignedStudentsCount} / {r.capacity} seats</span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <p className="font-medium text-slate-900">Designated Boarding Stops:</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.stops.map((stop, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded text-slate-700">
                      {i + 1}. {stop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-slate-400" /> Driver: {r.driverName}
              </span>
              <span className="font-mono">{r.driverPhone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
