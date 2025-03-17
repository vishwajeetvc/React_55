import util from 'util'
import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import User from '../models/userModel.js';
import Directory from '../models/directoryModel.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  const foundUser = await User.findOne({ email }).lean();

  if (foundUser) {
    return res.status(409).json({
      error: "User already exists",
      message:
        "A user with this email address already exists. Please try logging in or use a different email.",
    });
  }

  try {
    const rootDirId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    await Directory.insertOne({
      _id : rootDirId,
      name: `root-${email}`,
      parentDirId: null,
      userId,
    });

    await User.insertOne({
      _id:userId,
      name,
      email,
      password,
      rootDirId,
    });

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    if(err.code == 121) {
      console.log(util.inspect(err, { depth: null, colors: true }));
      res.status(404).json({ error: "Invalid fields" });
    } else {
      next(err);
    }
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(404).json({ error: "Ghare ja" });
  }

  res.cookie("uid", user._id.toString(), {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: "logged in" });
});

router.get("/", checkAuth, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("uid");
  res.status(204).end();
});

export default router;
