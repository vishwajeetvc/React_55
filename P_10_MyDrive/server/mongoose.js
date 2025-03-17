import mongoose from 'mongoose'

export async function connectDBmongoose(){
  await mongoose.connect("mongodb://localhost:27017/storageApp");
  console.log("Connected To db");
}

process.on("SIGINT", async() => {
  mongoose.disconnect()
  console.log("Client Disconnected");
  process.exit(0);
})

