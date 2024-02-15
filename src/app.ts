import cors from 'cors';
import express, { Express, json } from 'express';
import { setupRoutes } from "./config/routes";

export const setupApp = (): Express => {
  const app = express();
  const corsOptions = {
    origin: '*',
    maxAge: 5,
    credentials: true,
    methods: ['GET', 'POST', 'UPDATE', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }
  app.use(json());
  app.use(cors(corsOptions));
  setupRoutes(app)
  return app
}