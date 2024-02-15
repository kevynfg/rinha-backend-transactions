import { Kysely } from 'kysely';
import { Database } from "../db/init";
import { Transaction } from "../models/transaction";
import { CustomerRepository } from "./protocols/customer";
export class CustomerRepositoryDb implements CustomerRepository {
  constructor(
    private readonly db: Kysely<Database>
  ) {}
  async createTransaction(transaction: Transaction): Promise<any> {
    this.db.transaction().execute(async (trx) => {
      
    });
  }

  async getCustomerLastTransactions (id: number): Promise<any> {
    return this.db.selectFrom('clientes')
    .innerJoin('saldos', 'clientes.id', 'saldos.cliente_id')
      .where('saldos.cliente_id', '=', id)
      .innerJoin('transacoes', 'clientes.id', 'transacoes.cliente_id')
        .where('transacoes.cliente_id', '=', id)
        .limit(10).execute();
  };

  async getCustomer (id: number): Promise<any> {
    return this.db.selectFrom('clientes').innerJoin('saldos', 'clientes.id', 'saldos.cliente_id')
      .where('clientes.id', '=', id).select(['clientes.id', 'clientes.limite', 'saldos.valor']);
  };
} 