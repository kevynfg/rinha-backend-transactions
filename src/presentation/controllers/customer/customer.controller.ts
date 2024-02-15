import { Request, Response } from "express";
import { ICustomer } from "../../../services/protocols/customer";
import { ERRORS } from "../../../utils/errors";

export class Customer {
  constructor(
    private readonly customerService: ICustomer
  ) { }
  async transaction(request: Request, res: Response): Promise<any> {
    try {
      const { body = null, params = null } = request;
      if (!body || !params) {
        return res.status(400).json({
          error: 'Bad request'
        })
      };
      const transaction = await this.customerService.createTransaction(params.id, body);
      if (!transaction || typeof transaction === 'number') {
        return res.status(transaction).json({
          error: ERRORS[transaction]
        })
      }
      return res.status(200).json({
        limite: transaction.limite,
        saldo: transaction.saldo
      })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({
        error: 'Internal server error'
      })
    }
  }

  async getCustomer(request: Request, res: Response): Promise<any> {
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