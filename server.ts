import connectDB from "./utils/db";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

// Validate essential environment variables
const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is required`);
  }
}

// Server setup
const PORT = process.env.PORT || 3000;

// Graceful shutdown function
const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  server.close(() => {
    console.log("Graceful shutdown completed");
    process.exit(0);
  });

  // Force shutdown after 30 seconds if graceful shutdown fails
  setTimeout(() => {
    console.log("Graceful shutdown timeout, forcing shutdown...");
    process.exit(1);
  }, 30000);
};

const server = app.listen(PORT, () => {
  console.log(`
    🚀 Server is running!
    🔊 Listening on port ${PORT}
    🌎 Environment: ${process.env.NODE_ENV}
    📍 Backend URL: ${process.env.BACKEND_URI}
  `);

  // Connect to database
  connectDB();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Starting shutdown...");
  console.log(err.name, err.message);
  gracefulShutdown();
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Starting shutdown...");
  console.log(err.name, err.message);
  gracefulShutdown();
});

// Handle termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);