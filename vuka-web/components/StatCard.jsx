export default function StatCard({ title, value, icon, color = "" }) {
  return (
    <div
      className={`bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${color}`}
    >
      <div className="flex justify-between items-start gap-2">
        <p className="text-xs font-medium text-zinc-500 tracking-tight">
          {title}
        </p>
        <div className="p-1.5 rounded-lg bg-zinc-950/50 border border-zinc-800/40">
          {icon}
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100 mt-4">
        {value}
      </h2>
    </div>
  );
}
