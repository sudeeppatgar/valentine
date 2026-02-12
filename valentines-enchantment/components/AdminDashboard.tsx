import React, { useEffect, useState } from "react";
import { adminLogin, getAllValentines, updateValentineStatus } from "../services/apiService";
import { ValentineData } from "../types";

const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
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

  const updateStatus = async (shareId: string, status: "pending" | "approved" | "rejected") => {
    try {
      const updated = await updateValentineStatus(shareId, status);
      setValentines((prev) => prev.map((v) => (v.shareId === shareId ? updated : v)));
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  if (!token) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-6">
        <h2 className="text-3xl font-romantic font-bold text-rose-600">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition-all"
          >
            Login
          </button>
        </form>
        {error && <p className="text-rose-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-3xl font-romantic font-bold text-rose-600">Admin Approval</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadValentines}
            className="text-rose-500 border border-rose-300 px-4 py-2 rounded-full hover:bg-rose-50"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="text-rose-500 border border-rose-300 px-4 py-2 rounded-full hover:bg-rose-50"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <p className="text-rose-400">Loading...</p>}
      {error && <p className="text-rose-600">{error}</p>}
      {valentines.length === 0 && !loading && <p className="text-rose-400">No requests yet.</p>}

      <div className="space-y-3">
        {valentines.map((v) => (
          <div key={v.shareId} className="bg-white p-4 rounded-xl border border-rose-100 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-semibold text-rose-600">{v.recipientName}</p>
                <p className="text-rose-400 text-sm">From {v.senderName}</p>
                <p className="text-rose-400 text-sm">Status: {v.status || "pending"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "approved")}
                  className="bg-emerald-500 text-white px-3 py-2 rounded-xl text-sm"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "rejected")}
                  className="bg-rose-500 text-white px-3 py-2 rounded-xl text-sm"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(v.shareId, "pending")}
                  className="border border-rose-200 text-rose-500 px-3 py-2 rounded-xl text-sm"
                >
                  Set Pending
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-rose-500 text-sm break-all">
              <span>Share: {`${window.location.origin}/?share=${v.shareId}`}</span>
              <button
                type="button"
                className="text-rose-600 underline"
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/?share=${v.shareId}`)}
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
