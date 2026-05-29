import "dotenv/config";

import express from "express";
import db from "./db/db_config.js";

import cors from "cors";

import { errorHandler } from "./src/middleware/error.handler.js";

import mainRouter from "./src/api/main.routes.js";

const defaultOrigins = [
  "https://chatgpt-clone-1-wfx8.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function normalizeOrigin(origin) {
  return origin?.replace(/\/$/, "") ?? "";
}

const allowedOrigins = (
  process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : defaultOrigins
)
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

const allowedOriginSet = new Set(allowedOrigins);

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOriginSet.has(normalizeOrigin(origin))) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  }),
);
app.use(express.json());

app.use("/api", mainRouter);

// Final middleware for handling errors
app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    // console.log('db conected');
    connection.release();

    app.listen(2000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Server is running on http://localhost:2000");
      }
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}


startServer();
