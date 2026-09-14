import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import corsMiddleware from "./config/cors.js";

const app = express();

app.use(helmet());

app.use(corsMiddleware);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Informative Platform API is running",
  });
});

export default app;
