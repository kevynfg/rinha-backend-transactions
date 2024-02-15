import { Request, Response } from "express";
import { ICustomer } from "../../../services/protocols/customer";

export class Customer {
    constructor(
      private readonly customerService: ICustomer
    ) {}
    async transaction (request: Request, res: Response): Promise<any> {
      const { body, params } = request;
      if (!body || !params) {
        return res.status(400).json({
          error: 'Bad request'
        })
      };
      const transaction = await this.customerService.createTransaction(body);
      if (!transaction) {
        return res.status(404).json({
          error: 'Not found'
        })
      }
      return res.status(200).json({
        limite: transaction.limite,
        saldo: transaction.saldo
      })
    }

    async getCustomer (request: Request, res: Response): Promise<any> {
      console.log('entrou')
      const { params } = request;
      if (!params) {
        return res.status(400).json({
          error: 'Bad request'
        })
      };
      const customer = await this.customerService.getCustomer(+params.id);
      if (!customer) {
        return res.status(404).json({
          error: 'Not found'
        })
      }
      return res.status(200).json(customer);
    }
}