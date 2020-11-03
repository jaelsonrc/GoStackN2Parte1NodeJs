import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  transactions: Transaction[];
  balance: Balance;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transactions {
    const transactions: Transactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value) || [0];

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value) || [0];

    const income = incomes.reduce((t, i) => t + i, 0);

    const outcome = outcomes.reduce((t, o) => t + o, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
