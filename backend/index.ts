import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/products", productRoutes);

  // DB Connect - connect if not already connected
  if (mongoose.connection.readyState === 0 && process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch(err => {
        console.log("MongoDB connection failed:", err.message);
        console.log("Server will continue without database connection");
      });
  }

  return app;
}