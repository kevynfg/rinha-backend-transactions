import { Customer } from "../data/models/customer";
import { Transaction } from "../data/models/transaction";
import { CustomerRepository, FundsResponse } from "../data/repository/protocols/customer";
import { ICustomer, TransactionResponse } from "./protocols/customer";

export class CustomerService implements ICustomer {
  constructor(
    private readonly customerRepository: CustomerRepository
  ) {}
  async createTransaction(transaction: Transaction): Promise<TransactionResponse> {
    const customer = await this.customerRepository.getCustomer(+transaction.cliente_id);
    if (!customer) {
      return null
    };
    const isTransactionValid = validateLimitAndBalance(transaction, customer);
    if (!isTransactionValid) {
      return 'Transação inválida';
    }
    //return this.customerRepository.createTransaction(transaction);
    return {
      limite: 0,
      saldo: 0
    }
  }

  async getCustomer(id: number): Promise<FundsResponse> {
    console.log('entrou', id)
    const lastTransactions = await this.customerRepository.getCustomerLastTransactions(id);
    if (!lastTransactions) {
      return null;
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

const makeTransactionForRepository = (transaction: Transaction) => {
  return {
    cliente_id: transaction.cliente_id,
    valor: transaction.valor,
    tipo: transaction.tipo,
    descricao: transaction.descricao
  }
}