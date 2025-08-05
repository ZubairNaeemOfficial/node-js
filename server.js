import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth_routes.js";
import productRouter from "./routes/product_routes.js";
import ConnectDB from "./config/Config.js";

dotenv.config();

const app = express();

// ES6 __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);



// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
ConnectDB()
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
