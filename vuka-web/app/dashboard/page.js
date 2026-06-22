"use client";

import { useEffect, useState } from "react";
import {
  Thermometer,
  Droplets,
  Cpu,
  HardDrive,
  Weight,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import SystemPerformance from "@/components/SystemPerformance";
import HistoryLogTable from "@/components/HistoryLogTable";

import config from "@/config.json";
const API_URL = config.server;

export default function DashboardPage() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    try {
      const response = await fetch(`${API_URL}/get/sensor-data/latest`);
      if (!response.ok) return;
      const data = await response.json();

      setLatest(data);

      if (data && data.id) {
        setHistory((prevHistory) => {
          // Spriječavamo duplanje ako Pi još nije upisao novi podatak u bazu
          const vecPostoji = prevHistory.some((item) => item.id === data.id);
          if (vecPostoji) return prevHistory;

          // Dodajemo novi podatak na vrh i zadržavamo max 50 zapisa u memoriji
          return [data, ...prevHistory].slice(0, 50);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${API_URL}/get/sensor-data?page=1&limit=50`,
      );
      if (!response.ok) return;
      const data = await response.json();
      setHistory(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchLatest(), fetchHistory()]);
      setLoading(false);
    };

    load();

    const interval = setInterval(() => {
      fetchLatest();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col gap-4 items-center justify-center text-zinc-200">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-wide text-zinc-400">
          Učitavanje Nadzorne Ploče...
        </p>
      </div>
    );
  }

  const isOnline =
    latest && Date.now() - new Date(latest.vrijeme_zapisa).getTime() < 30000;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-zinc-100 p-6 md:p-10 antialiased selection:bg-emerald-500/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-zinc-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            Raspberry Pi Upravljanje
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Telemetrija i ekološka matrica u realnom vremenu
          </p>
        </div>

        <div
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md transition-all duration-300 ${
            isOnline
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/5 border-rose-500/20 text-rose-400"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? "bg-emerald-400" : "bg-rose-400"}`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? "bg-emerald-500" : "bg-rose-500"}`}
            ></span>
          </span>
          <span className="tracking-wide uppercase text-[10px]">
            {isOnline ? "Senzor Aktivan" : "Senzor Nedostupan"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Temperatura"
          value={`${latest?.temperatura ?? "--"} °C`}
          icon={<Thermometer size={18} className="text-emerald-400" />}
          color="hover:border-emerald-500/30"
        />
        <StatCard
          title="Vlažnost Vazduha"
          value={`${latest?.vlaznost ?? "--"} %`}
          icon={<Droplets size={18} className="text-blue-400" />}
          color="hover:border-blue-500/30"
        />
        <StatCard
          title="Vibracija"
          value={latest?.sila ?? "--"}
          icon={<Activity size={18} className="text-indigo-400" />}
          color="hover:border-indigo-500/30"
        />
        <StatCard
          title="Temperatura CPU-a"
          value={`${latest?.cpu_temp ?? "--"} °C`}
          icon={<Cpu size={18} className="text-amber-400" />}
          color="hover:border-amber-500/30"
        />
        <StatCard
          title="Opterećenje CPU-a"
          value={`${latest?.cpu_load ?? "--"} %`}
          icon={<Activity size={18} className="text-orange-400" />}
          color="hover:border-orange-500/30"
        />
        <StatCard
          title="Dostupan RAM"
          value={`${latest?.ram_used_gb ?? "--"} GB`}
          icon={<HardDrive size={18} className="text-pink-400" />}
          color="hover:border-pink-500/30"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Kretanje Temperature"
          subtitle="Kontinuirano logovanje senzora jezgre"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={history}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="vrijeme_zapisa"
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#f4f4f5",
                }}
              />
              <Area
                type="monotone"
                dataKey="temperatura"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#tempGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Relativna Vlažnost"
          subtitle="Analiza atmosferske vlage"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={history}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="vrijeme_zapisa"
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#f4f4f5",
                }}
              />
              <Area
                type="monotone"
                dataKey="vlaznost"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#humidGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <SystemPerformance
        cpuLoad={latest?.cpu_load}
        ramUsed={latest?.ram_used_gb}
      />

      <HistoryLogTable history={history} />
    </div>
  );
}
