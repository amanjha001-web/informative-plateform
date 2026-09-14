import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import { env, validateEnv } from "./config/env.js";

const startServer = async () => {
  try {
    validateEnv();

    await connectDB();

    app.listen(env.port, () => {
      console.log(` Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
