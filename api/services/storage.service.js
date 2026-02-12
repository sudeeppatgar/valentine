import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "valentines.json");

const defaultData = {
  users: {},
  valentines: {},
  userValentines: {},
};

const generateId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
};

const ensureStorage = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultData, null, 2), "utf-8");
  }
};

const readData = async () => {
  await ensureStorage();
  const raw = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(raw);
};

const writeData = async (data) => {
  await ensureStorage();
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
};

export const createUser = async ({ name, email }) => {
  const data = await readData();
  const userId = generateId();
  data.users[userId] = {
    userId,
    name,
    email,
    createdAt: Date.now(),
  };
  data.userValentines[userId] = [];
  await writeData(data);
  return data.users[userId];
};

export const getUser = async (userId) => {
  const data = await readData();
  return data.users[userId] || null;
};

export const listUserValentines = async (userId) => {
  const data = await readData();
  const ids = data.userValentines[userId] || [];
  return ids.map((id) => data.valentines[id]).filter(Boolean);
};

export const createValentine = async (userId, payload) => {
  const data = await readData();
  if (!data.users[userId]) {
    return null;
  }
  const shareId = generateId();
  const now = Date.now();
  data.valentines[shareId] = {
    shareId,
    userId,
    ...payload,
    createdAt: now,
    updatedAt: now,
  };
  data.userValentines[userId] = data.userValentines[userId] || [];
  data.userValentines[userId].push(shareId);
  await writeData(data);
  return data.valentines[shareId];
};

export const getValentine = async (shareId) => {
  const data = await readData();
  return data.valentines[shareId] || null;
};

export const updateValentine = async (shareId, payload) => {
  const data = await readData();
  if (!data.valentines[shareId]) return null;
  data.valentines[shareId] = {
    ...data.valentines[shareId],
    ...payload,
    updatedAt: Date.now(),
  };
  await writeData(data);
  return data.valentines[shareId];
};
