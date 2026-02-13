import { ValentineData, UserProfile } from "../types";

const API_BASE = "https://valentine-1-gtr6.onrender.com/api";

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json();
};

const adminRequest = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const token = localStorage.getItem("admin_token");
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json();
};

export const createUser = async (payload: {
  name: string;
  email: string;
}): Promise<UserProfile> => {
  const response = await request<any>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  // Map MongoDB _id to userId for consistency
  return {
    userId: response._id || response.id,
    name: response.name,
    email: response.email,
    createdAt: response.createdAt
      ? new Date(response.createdAt).getTime()
      : Date.now(),
  };
};

export const getUserValentines = (userId: string) =>
  request<ValentineData[]>(`/users/${userId}/valentines`);

export const createValentine = (payload: {
  userId: string;
  data: Omit<ValentineData, "shareId" | "userId" | "createdAt" | "updatedAt">;
}) =>
  request<ValentineData>("/valentines", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getValentine = (shareId: string) =>
  request<ValentineData>(`/valentines/${shareId}`);

export const uploadImage = (payload: { imageBase64: string; name?: string }) =>
  request<{ url: string; deleteUrl?: string }>("/media/upload", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getAllValentines = () =>
  adminRequest<ValentineData[]>("/admin/valentines");

export const updateValentineStatus = (
  shareId: string,
  status: "pending" | "approved" | "rejected",
) =>
  adminRequest<ValentineData>(`/admin/valentines/${shareId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const adminLogin = (payload: { email: string; password: string }) =>
  request<{ token: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
