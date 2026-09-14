import cors from "cors";
import { env } from "./env.js";

const allowedOrigins = [env.clientUrl, env.adminUrl].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without origin (Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

export default cors(corsOptions);
