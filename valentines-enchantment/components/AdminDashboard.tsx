import React, { useEffect, useState } from "react";
import {
  adminLogin,
  getAllValentines,
  updateValentineStatus,
} from "../services/apiService";
import { ValentineData } from "../types";

const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("admin_token"),
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valentines, setValentines] = useState<ValentineData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadValentines = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllValentines();
      setValentines(data);
    } catch (err: any) {
      setError(err.message || "Failed to load valentines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadValentines();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem("admin_token", res.token);
      setToken(res.token);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setValentines([]);
  };

  const updateStatus = async (
    shareId: string,
    status: "pending" | "approved" | "rejected",
  ) => {
    try {
      const updated = await updateValentineStatus(shareId, status);
      setValentines((prev) =>
        prev.map((v) => (v.shareId === shareId ? updated : v)),
      );
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  if (!token) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-4 sm:space-y-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-romantic font-bold text-rose-600">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm sm:text-base min-h-10 sm:min-h-12"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm sm:text-base min-h-10 sm:min-h-12"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all text-sm sm:text-base min-h-10 sm:min-h-12"
          >
            Login
          </button>
        </form>
        {error && <p className="text-rose-600 text-sm sm:text-base">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h2 className="text-2xl sm:text-3xl font-romantic font-bold text-rose-600">
          Admin Approval
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadValentines}
            className="text-rose-500 border border-rose-300 px-3 sm:px-4 py-2 rounded-full hover:bg-rose-50 active:bg-rose-100 transition-colors text-sm sm:text-base min-h-9 sm:min-h-10"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="text-rose-500 border border-rose-300 px-3 sm:px-4 py-2 rounded-full hover:bg-rose-50 active:bg-rose-100 transition-colors text-sm sm:text-base min-h-9 sm:min-h-10"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-rose-400 text-sm sm:text-base">Loading...</p>
      )}
      {error && <p className="text-rose-600 text-sm sm:text-base">{error}</p>}
      {valentines.length === 0 && !loading && (
        <p className="text-rose-400 text-sm sm:text-base">No requests yet.</p>
      )}

      <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
        {valentines.map((v) => (
          <div
            key={v.shareId}
            className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-rose-100 space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-rose-600 text-sm sm:text-base truncate">
                  {v.recipientName}
                </p>
                <p className="text-rose-400 text-xs sm:text-sm">
                  From {v.senderName}
                </p>
                <p className="text-rose-400 text-xs sm:text-sm">
                  Status: {v.status || "pending"}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "approved")}
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all min-h-8 sm:min-h-9"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "rejected")}
                  className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all min-h-8 sm:min-h-9"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "pending")}
                  className="border border-rose-200 hover:bg-rose-50 active:bg-rose-100 text-rose-500 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all min-h-8 sm:min-h-9"
                >
                  Pending
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-rose-500 text-xs sm:text-sm break-all">
              <span className="truncate">
                Share: {`${window.location.origin}/?share=${v.shareId}`}
              </span>
              <button
                type="button"
                className="text-rose-600 hover:text-rose-700 underline active:text-rose-800 transition-colors flex-shrink-0"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/?share=${v.shareId}`,
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
