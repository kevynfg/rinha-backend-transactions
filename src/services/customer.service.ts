import { Customer } from "../data/models/customer";
import { Transaction } from "../data/models/transaction";
import { CustomerRepository, FundsResponse } from "../data/repository/protocols/customer";
import { ERROR_CODE } from "../utils/errors";
import { ICustomer, TransactionResponse } from "./protocols/customer";

export class CustomerService implements ICustomer {
  constructor(
    private readonly customerRepository: CustomerRepository
  ) {}
  async createTransaction(id: string, transaction: Transaction): Promise<TransactionResponse | number> {
    const customer = await this.customerRepository.getCustomer(+id);
    console.log('customer', customer)
    if (!customer) {
      return ERROR_CODE.NOT_FOUND;
    };
    const isTransactionValid = validateLimitAndBalance(transaction, customer);
    if (!isTransactionValid) {
      return ERROR_CODE.UNPROCESSABLE_ENTITY;
    }
    const transactionForRepository = makeTransactionForRepository(id, transaction);
    console.log('transactionForRepository', transactionForRepository);
    return await this.customerRepository.createTransaction(transactionForRepository);
  }

  async getCustomer(id: number): Promise<FundsResponse | number> {
    console.log('entrou', id)
    const lastTransactions = await this.customerRepository.getCustomerLastTransactions(id);
    console.log('lastTransactions', lastTransactions)
    if (!lastTransactions) {
      return ERROR_CODE.NOT_FOUND;
    }
    return {
      saldo: {
        total: 0,
        data_extrato: '',
        limite: 0
      },
      ultimas_transacoes: []
    };
  }
}

const validateLimitAndBalance = (transaction: Transaction, customerData: Customer & {saldo: number}) => {
  if (transaction.tipo === 'd' && transaction.valor - customerData.saldo < -customerData.limite) {
    return false;
  }
  if (transaction.tipo === 'c' && transaction.valor > customerData.limite) {
    return false;
  }
  return true;
}

const makeTransactionForRepository = (id: string, transaction: Transaction) => {
  return {
    cliente_id: +id,
    valor: transaction.valor,
    tipo: transaction.tipo,
    descricao: transaction.descricao
  }
}