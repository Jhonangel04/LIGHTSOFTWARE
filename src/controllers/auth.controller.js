import "dotenv/config";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/User.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const comparePasword = await bcryptjs.compare(password, user.password);
    if (!comparePasword)
      return res.status(401).json({ message: "incorrect password" });

    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);
    res.json({ message: "user logged in successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, status } = req.body;
    if (email)
      return res.status(400).json({ message: ["The Email already exists"] });

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      status,
    });

    const userSave = await newUser.save();

    const token = await createAccessToken({ id: userSave._id });

    res.cookie("token", token);
    res.json({ message: "user created successfully", user: userSave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "user not found" });

    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
