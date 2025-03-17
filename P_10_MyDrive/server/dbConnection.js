import { MongoClient } from 'mongodb'

export const client = new MongoClient("mongodb://localhost:27017/storageApp");

export async function connectDB(){
  await client.connect();
  console.log("Connected To db");
  return client.db();
}

process.on("SIGINT", async() => {
  client.close()
  console.log("Client Disconnected");
  process.exit(0);
})
