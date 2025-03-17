import { MongoClient } from "mongodb";
import { readdir } from "node:fs/promises";

let client = null;
const url = "mongodb://localhost:27017/";

try {
  client = new MongoClient(url);
} catch (e) {
  console.log(e, "Error while Connection to database.");
}

export default async function getImages(start, end) {
  const gallery = client.db("gallery");
  const imagesCollection = gallery.collection("images");

  try {
    const cursor = await imagesCollection.find({
      _id: { $gte: start, $lte: end },
    });
    const arr = await cursor.toArray();
    return arr;
  } catch (error) {
    console.log("Something Went wrong");
  }
}

export async function upload() {
  try {
    const gallery = client.db("gallery");
    const imagesCollection = gallery.collection("images");

    let images = await readdir("./imageStore");
    images = images.map((image, i) => ({
      name: image,
      _id: i,
    }));

    await imagesCollection.insertMany(images);
  } catch (e) {
    console.log(e);
  }
}
