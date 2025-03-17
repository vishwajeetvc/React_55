import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";


export const getDirectoryById = async (req, res) => {
  const user = req.user;
  const _id = req.params.id || user.rootDirId.toString();
  const directoryData = await Directory.findOne({ _id }).lean();
  if (!directoryData) {
    return res
      .status(404)
      .json({ error: "Directory not found or you do not have access to it!" });
  }
  const files = await File.find({ parentDirId: directoryData._id }).lean();
  const directories = await Directory.find({ parentDirId: _id }).lean();
  return res.status(200).json({
    ...directoryData,
    files: files.map((dir) => ({ ...dir, id: dir._id })),
    directories: directories.map((dir) => ({ ...dir, id: dir._id })),
  });
}

export const createDirectory = async (req, res, next) => {
  const user = req.user;
  const parentDirId = req.params.parentDirId || user.rootDirId.toString();
  const dirname = req.headers.dirname || "New Folder";
  try {
    const parentDir = await Directory.findOne({ _id: parentDirId }).lean();
    if (!parentDir)
      return res
        .status(404)
        .json({ message: "Parent Directory Does not exist!" });

    await Directory.insertOne({
      name: dirname,
      parentDirId,
      userId: user._id,
    });

    return res.status(200).json({ message: "Directory Created!" });
  } catch (err) {
    next(err);
  }
}

export const renameDirectory = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const { newDirName } = req.body;
  try {
    await Directory.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      { name: newDirName }
    );
    res.status(200).json({ message: "Directory Renamed!" });
  } catch (err) {
    next(err);
  }
}
export const deleteDirectory = async (req, res, next) => {
  const user = req.user;
  const db = req.db;
  const { id } = req.params;

  remove(user, db, id);

  try {
    res.status(200).json({ message: "Directory Deleted" });
  } catch (err) {
    next(err);
  }
}

async function remove(user, db, targetDirId) {
  await File.deleteMany({
    parentDirId: targetDirId,
    userId: user._id,
  });

  const subDirs = await Directory.find({
    parentDirId: targetDirId,
    userId: user._id,
  }).lean();

  if (subDirs.length) {
    subDirs.forEach((dir) => remove(user, db, dir._id));
  }

  await Directory.deleteOne({
    _id: targetDirId,
    userId: user._id,
  });
}

