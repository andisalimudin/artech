import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookkeepingService {
  constructor(private prisma: PrismaService) {}

  async getAccounts() {
    return this.prisma.account.findMany();
  }

  async getTransactions(query: any) {
    const { startDate, endDate, type, category } = query;
    const where: any = {};

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (type) {
      where.type = type;
    }
    
    // Note: The current Transaction model in schema.prisma does not have a 'category' field directly,
    // it links to an Account which has a type. 
    // However, for the purpose of the frontend "Financial Reports" which sends "category" strings like "Office",
    // we might need to adjust the schema or the logic.
    // Looking at the frontend code, it sends: description, amount, type (INCOME/EXPENSE), date, category.
    // But the backend schema for Transaction is: id, date, description, amount, type (DEBIT/CREDIT), accountId.
    
    // To support the simple frontend "Income/Expense" tracking without full double-entry accounting complexity for now:
    // We should probably use the `Expense` model for expenses and maybe add an `Income` model or just use `Transaction` loosely.
    
    // Let's look at what the frontend expects:
    // Frontend sends: { date, description, amount, type: 'EXPENSE' | 'INCOME', category }
    
    // Let's fetch from the Transaction table but we might need to enhance it or map it.
    // For now, let's return what we have, but we need to implement the createTransaction to match frontend.
    
    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { account: true }
    });
  }

  async createTransaction(data: any) {
    // Frontend sends: { date, description, amount, type: 'EXPENSE' | 'INCOME', category }
    // Backend Transaction model: { date, description, amount, type: 'DEBIT' | 'CREDIT', accountId }
    
    // We need to find or create an Account for the category
    let account = await this.prisma.account.findFirst({
      where: { name: data.category }
    });

    if (!account) {
      // Create a default account code based on timestamp to avoid collisions
      const code = `${data.type === 'INCOME' ? '4' : '5'}${Date.now().toString().slice(-4)}`;
      
      account = await this.prisma.account.create({
        data: {
          name: data.category,
          code: code,
          type: data.type, // INCOME or EXPENSE
          balance: 0
        }
      });
    }

    // Update account balance
    const amount = Number(data.amount);
    await this.prisma.account.update({
      where: { id: account.id },
      data: {
        balance: {
          increment: amount
        }
      }
    });

    return this.prisma.transaction.create({
      data: {
        date: new Date(data.date),
        description: data.description,
        amount: data.amount,
        type: data.type, // Store INCOME/EXPENSE directly as type for simplicity in this app context, or map to DEBIT/CREDIT
        accountId: account.id,
      },
    });
  }

  async getProfitAndLoss(startDate: string, endDate: string) {
    // Calculate total Income and Expenses
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();

    const transactions = await this.prisma.transaction.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        account: true,
      },
    });

    const income = transactions
      .filter(t => t.account.type === 'INCOME' || t.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = transactions
      .filter(t => t.account.type === 'EXPENSE' || t.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      startDate: start,
      endDate: end,
      income,
      expenses,
      netProfit: income - expenses,
    };
  }

  async getBalanceSheet(date: string) {
    // Simplified Balance Sheet
    // Assets = Liabilities + Equity
    
    // This requires a more complex double-entry system which might be overkill.
    // For now, returning account balances grouped by type.
    
    const accounts = await this.prisma.account.findMany();
    
    const assets = accounts.filter(a => a.type === 'ASSET');
    const liabilities = accounts.filter(a => a.type === 'LIABILITY');
    const equity = accounts.filter(a => a.type === 'EQUITY');
    
    return {
      assets,
      liabilities,
      equity,
      totalAssets: assets.reduce((sum, a) => sum + Number(a.balance), 0),
      totalLiabilities: liabilities.reduce((sum, a) => sum + Number(a.balance), 0),
      totalEquity: equity.reduce((sum, a) => sum + Number(a.balance), 0),
    };
  }
}
