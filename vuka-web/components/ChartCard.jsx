export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
