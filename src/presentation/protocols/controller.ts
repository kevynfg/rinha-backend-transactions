import { Response } from "express";
import { HttpRequest } from "./http";

export interface Controller {
  transaction: (request: HttpRequest, res: Response) => Promise<any>;
}