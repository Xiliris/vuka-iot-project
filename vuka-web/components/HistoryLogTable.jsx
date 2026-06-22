export default function HistoryLogTable({ history }) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-zinc-800/60">
        <h2 className="text-base font-semibold tracking-tight">
          Istorija Zapisa
        </h2>
        <p className="text-xs text-zinc-500">
          Prikaz posljednjih 50 očitanih prijenosa
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/20 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-3.5">Vrijeme Zapisa</th>
              <th className="px-6 py-3.5">Temperatura Okoline</th>
              <th className="px-6 py-3.5">Vlažnost</th>
              <th className="px-6 py-3.5">Intenzitet Vibracije</th>{" "}
              <th className="px-6 py-3.5">Temperatura CPU-a</th>
              <th className="px-6 py-3.5">Opterećenje CPU-a</th>
              <th className="px-6 py-3.5">Zauzeće RAM-a</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/40 text-xs text-zinc-300">
            {history.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-zinc-800/20 transition-colors duration-150"
              >
                <td className="px-6 py-3.5 text-zinc-400 font-mono">
                  {new Date(item.vrijeme_zapisa).toLocaleString()}
                </td>
                <td className="px-6 py-3.5 font-medium">
                  {item.temperatura}°C
                </td>
                <td className="px-6 py-3.5">{item.vlaznost}%</td>
                <td className="px-6 py-3.5 text-zinc-400">{item.sila}</td>
                <td className="px-6 py-3.5 font-medium text-amber-400/90">
                  {item.cpu_temp}°C
                </td>
                <td className="px-6 py-3.5 font-mono">{item.cpu_load}%</td>
                <td className="px-6 py-3.5 text-zinc-400">
                  {item.ram_used_gb} GB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
