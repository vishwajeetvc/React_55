import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import checkAuth from "./middlewares/authMiddleware.js";

import { connectDB } from "./dbConnection.js";
import { connectDBmongoose } from "./mongoose.js";

try {
  const db = await connectDB();
  await connectDBmongoose();
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use((req, _res, next)=>{
    req.db = db;
    next();
  })

  app.use("/directory", checkAuth, directoryRoutes);
  app.use("/file", checkAuth, fileRoutes);
  app.use("/user", userRoutes);

  app.use((err, req, res, _next) => {
    console.log(err);
    res.status(err.status || 500).json({ error: "Something went wrong!!" });
  });

  app.listen(4000, () => {
    console.log(`Server Started`);
  });

} catch (error) {
  console.log("Couldn't connect to DataBase");
}
