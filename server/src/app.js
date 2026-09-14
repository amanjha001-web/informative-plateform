import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import corsMiddleware from "./config/cors.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(corsMiddleware);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Informative Platform API is running",
  });
});

app.get("/api/test-error", (req, res, next) => {
  next(new ApiError(400, "Test error working"));
});

export default app;
