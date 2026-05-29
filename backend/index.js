import "dotenv/config";

import express from "express";
import db from "./db/db_config.js";

import cors from "cors";

import { errorHandler } from "./src/middleware/error.handler.js";

import mainRouter from "./src/api/main.routes.js";

const app = express();

app.use(cors());
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
