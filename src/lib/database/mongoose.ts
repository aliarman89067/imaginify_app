import mongoose, { Mongoose } from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

interface mongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
let cached: mongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGO_URL) throw new Error("Mongo Url Missing!");
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URL, { dbName: "imaginify", bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
};
