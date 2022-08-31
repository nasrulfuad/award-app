import { v1AwardRoutes, v1UserRoutes } from "@app/v1/routes";
import express, { Application } from "express";
import cors from "cors";

async function createServer() {
  const server: Application = express();

  /** Enable Json Body Parser */
  server.use(express.json());
  /** Allow Cors */
  server.use(cors());

  /** User Routes */
  server.use("/api/v1/users", v1UserRoutes);
  /** Award Routes */
  server.use("/api/v1/awards", v1AwardRoutes);

  return server;
}

export { createServer };
