import { Kysely, sql } from 'kysely';
import { Database } from "../db/init";
import { CustomerRepository, TransactionRequest } from "./protocols/customer";



export class CustomerRepositoryDb implements CustomerRepository {
  constructor(
    private readonly db: Kysely<Database>
  ) { }
  async createTransaction(transaction: TransactionRequest): Promise<any> {
    return await this.db.transaction().execute(async (trx) => {
      const updateBalance = await trx.updateTable('saldos').set(
        'valor', sql`valor + ${transaction.tipo === 'd' ? -transaction.valor : transaction.valor}`
      )
        .where('cliente_id', '=', transaction.cliente_id).returning(['valor']).executeTakeFirstOrThrow()
      const customer = await trx.selectFrom('clientes').where('clientes.id', '=', transaction.cliente_id).select(['clientes.limite']).executeTakeFirstOrThrow();
      const { limite } = customer;
      const { valor } = updateBalance;
      if (transaction.tipo === 'd' && valor - transaction.valor < -limite) {
        throw new Error('Unprocessable entity');
      };

      if (transaction.tipo === 'c' && transaction.valor > limite) {
        throw new Error('Unprocessable entity');
      };
      await trx.insertInto('transacoes').values({
        cliente_id: transaction.cliente_id,
        valor: transaction.valor,
        tipo: transaction.tipo,
        descricao: transaction.descricao,
        data: new Date(),
      }).returning('id').execute();
      return { limite, saldo: valor };
    });
  }

  async getCustomerLastTransactions(id: number): Promise<any> {
    const balance = await this.db.selectFrom('clientes')
      .innerJoin('saldos', 'clientes.id', 'saldos.cliente_id')
      .where('cliente_id', '=', id).select(['valor as total', sql`NOW()`.as('data_extrato'), 'clientes.limite']).executeTakeFirst();
      console.log('balance', balance)
    if (!balance) {
      return 404;
    };

    const transactions = await this.db.selectFrom('clientes')
      .innerJoin('transacoes', 'clientes.id', 'transacoes.cliente_id')
      .where('transacoes.cliente_id', '=', id)
      .select(['transacoes.valor', 'transacoes.tipo', 'transacoes.descricao', 'transacoes.data as realizada_em'])
      .orderBy('realizada_em', 'desc')
      .limit(10).execute();
      console.log('transactions', transactions)
    return makeLastTransactions(balance, transactions);
  };

  async getCustomer(id: number): Promise<any> {
    return this.db.selectFrom('clientes').innerJoin('saldos', (join) => join.onRef('clientes.id', '=', 'saldos.cliente_id').on('saldos.cliente_id', '=', id)).selectAll().executeTakeFirst();
  };
}

type LastTransactions = {
  valor: number;
  tipo: "d" | "c";
  descricao: string;
  realizada_em: string | unknown;
}

type Balance = {
  total: number;
  data_extrato: string | unknown;
  limite: number;
}

const makeLastTransactions = (balance: Balance, transactions: LastTransactions[]) => {
  return {
    saldo: {
      total: balance.total,
      data_extrato: balance.data_extrato,
      limite: balance.limite
    },
    ultimas_transacoes: transactions
  }
}