import { ObjectId } from "mongodb";
export default function (_req, res, next, id) {
  if (!ObjectId.isValid(new ObjectId(String(id)))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }
  next();
}
