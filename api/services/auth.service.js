import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/* -----------------------------
   Create User
----------------------------- */
export const createUser = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  role,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    firstName,
    lastName,
    email,
    phone,
    role,
    password: hashedPassword,
  });
};

/* -----------------------------
   Find user by email
----------------------------- */
export const findUserByEmail = async (email, withPassword = false) => {
  const query = User.findOne({ email });
  if (withPassword) query.select("+password");
  return query;
};

/* -----------------------------
   Compare password
----------------------------- */
export const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

/* -----------------------------
   Get user by ID
----------------------------- */
export const findUserById = async (id) => {
  return User.findById(id);
};

/* -----------------------------
   Update own profile
----------------------------- */
export const updateUserById = async (id, data) => {
  delete data.password; // password handled separately
  delete data.role; // role cannot be updated here

  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/* -----------------------------
   Admin: get all producers
----------------------------- */
export const getAllProducers = async () => {
  return User.find({ role: "producer" }).select("-password");
};

/* -----------------------------
   Admin: get producers (paginated)
----------------------------- */
export const getProducersPaginated = async ({
  page = 1,
  limit = 10,
  search = "",
  state,
}) => {
  const skip = (page - 1) * limit;

  const filter = { role: "producer" };

  if (state) {
    filter.state = state;
  }

  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
    ];
  }

  const [producers, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return {
    producers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
