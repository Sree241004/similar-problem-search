import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.DB_NAME;

export async function connectToDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  }
  return client.db(dbName);
}
