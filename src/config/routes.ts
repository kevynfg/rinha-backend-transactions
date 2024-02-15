import { Express, Router } from "express";
import { readdirSync } from "fs";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use(router);
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.includes(".test.")) {
      console.log(file);
      (await import(`../routes/${file}`)).default(router);
    }
  });
};
