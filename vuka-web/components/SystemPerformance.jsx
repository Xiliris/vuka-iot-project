import { Radio } from "lucide-react";

export default function SystemPerformance({ cpuLoad, ramUsed }) {
  const ramPercentage = ((ramUsed || 0) / 8) * 100;

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Performanse Sistema
            </h2>
            <p className="text-xs text-zinc-500">
              Iskorištenost hardvera u realnom vremenu
            </p>
          </div>
          <Radio size={16} className="text-zinc-500 animate-pulse" />
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-zinc-400">Opterećenje Procesora (CPU)</span>
              <span className="text-zinc-200">{cpuLoad ?? "--"}%</span>
            </div>
            <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${cpuLoad ?? 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-zinc-400">Zauzeće Memorije (RAM)</span>
              <span className="text-zinc-200">{ramUsed ?? "--"} GB</span>
            </div>
            <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${ramPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Brzi Uvid</h2>
          <p className="text-xs text-zinc-500 mb-4">Trenutno stanje uređaja</p>
        </div>
        <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Profil Hardvera</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
            ARMv8
          </span>
        </div>
      </div>
    </div>
  );
}
