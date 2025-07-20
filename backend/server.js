import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRouter from "./router/productRouter.js";

dotenv.config();
const app = express();

// For ES module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use("/api/products", productRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // ✅ Correct catch-all route syntax for Express 5
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("✅ Server is running on port 5000");
});
