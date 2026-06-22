"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const SECRET_PASSWORD = "admin"; // Promijeni po želji

    if (password === SECRET_PASSWORD) {
      localStorage.setItem("is_auth", "true");
      setError("");
      router.push("/dashboard");
    } else {
      setError("Netačna lozinka. Pokušaj ponovo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 font-sans antialiased">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl border border-gray-700/60 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Sense HAT Node
        </h2>
        <p className="text-sm text-center text-gray-400 mb-8">
          Unesite pristupnu lozinku za pregled IoT panela
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lozinka
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            Pristupi Dashboardu
          </button>
        </form>
      </div>
    </div>
  );
}
