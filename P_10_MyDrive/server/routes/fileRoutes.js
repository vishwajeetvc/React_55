import express from "express";
import { createWriteStream } from "fs";
import { rm } from "fs/promises";
import path from "path";
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

router.post("/:parentDirId?", async (req, res) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId;
  const parentDirData = await Directory.findOne({
    _id: parentDirId,
    userId: req.user._id,
  }).lean();

  if (!parentDirData) {
    return res.status(404).json({ error: "Parent directory not found!" });
  }

  const filename = req.headers.filename || "untitled";
  const extension = path.extname(filename);

  const insertedFile = await File.insertOne({
    extension,
    name: filename,
    parentDirId: parentDirData._id,
    userId: req.user._id,
  });

  const fileId = insertedFile._id.toString();

  const fullFileName = `${fileId}${extension}`;

  const writeStream = createWriteStream(`./storage/${fullFileName}`);
  req.pipe(writeStream);

  req.on("end", async () => {
    return res.status(201).json({ message: "File Uploaded" });
  });
  req.on("error", async () => {
    await File.deleteOne({ _id: insertedFile.insertedId });
    return res.status(404).json({ message: "could Not upload file" });
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const fileData = await File.findOne({
    _id: id,
    userId: req.user._id,
  }).lean();

  // If "download" is requested, set the appropriate headers
  const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;

  if (req.query.action === "download") {
    return res.download(filePath, fileData.name);
  }

  // Send file
  return res.sendFile(filePath, (err) => {
    if (!res.headersSent && err) {
      return res.status(404).json({ error: "File not found!" });
    }
  });
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const fileData = await File.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!fileData) {
    return res.status(404).json({ error: "File not found!" });
  }

  try {
    await File.findOneAndUpdate(
      { _id: id},
      { name: req.body.newFilename },
    );
    return res.status(200).json({ message: "Renamed" });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const fileData = await File.findOne({
    _id: id,
    userId: req.user._id,
  });
  if (!fileData) {
    return res.status(404).json({ error: "File not found" });
  }
  try {
    await rm(`./storage/${id}${fileData.extension}`);
    await File.deleteOne({ _id: fileData._id });
    return res.status(200).json({ message: "File Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
