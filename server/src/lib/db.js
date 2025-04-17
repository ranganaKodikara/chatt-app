import mongo from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongo.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
