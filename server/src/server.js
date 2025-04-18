import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const PORT = process.env.PORT || 3301;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientBuildPath = path.join(__dirname, "../../client/dist");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "development") {
  app.use(express.static(clientBuildPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
