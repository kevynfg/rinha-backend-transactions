import { Router } from "express";
import makeCustomerController from "../factories/customer-factory";

export default (router: Router): void => {
  router.post("/clientes/:id/transacoes", async (req, res) => await makeCustomerController().transaction(req, res));
  router.get("/clientes/:id/extrato", async (req, res) => await makeCustomerController().getCustomer(req, res));
};