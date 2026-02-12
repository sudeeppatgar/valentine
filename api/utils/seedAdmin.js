import { config } from "../config/index.js";
import { createUser, findUserByEmail } from "../services/auth.service.js";

export const ensureAdminUser = async () => {
  if (!config.adminEmail || !config.adminPassword) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set. Skipping admin seeding.");
    return;
  }

  const existing = await findUserByEmail(config.adminEmail);
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    return;
  }

  await createUser({
    firstName: config.adminFirstName || "Admin",
    lastName: config.adminLastName || "",
    email: config.adminEmail,
    phone: "",
    password: config.adminPassword,
    role: "admin",
  });
};
