// src/bookkeeping/bookkeeping.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookkeepingService {
  constructor(private prisma: PrismaService) {}

  async getAccounts() {
    return this.prisma.account.findMany();
  }

  async getTransactions(filters: any) {
    const { startDate, endDate, accountId } = filters;
    return this.prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
        accountId,
      },
      include: { account: true },
    });
  }

  async createTransaction(data: any) {
    return this.prisma.transaction.create({
      data,
    });
  }

  async getProfitAndLoss(startDate: string, endDate: string) {
    const income = await this.prisma.transaction.aggregate({
      where: {
        date: { gte: new Date(startDate), lte: new Date(endDate) },
        account: { type: 'INCOME' },
      },
      _sum: { amount: true },
    });

    const expenses = await this.prisma.transaction.aggregate({
      where: {
        date: { gte: new Date(startDate), lte: new Date(endDate) },
        account: { type: 'EXPENSE' },
      },
      _sum: { amount: true },
    });

    return {
      totalIncome: income._sum.amount || 0,
      totalExpense: expenses._sum.amount || 0,
      netProfit: (income._sum.amount || 0) as any - (expenses._sum.amount || 0) as any,
    };
  }

  async getBalanceSheet(date: string) {
    const assets = await this.prisma.account.aggregate({
      where: { type: 'ASSET' },
      _sum: { balance: true },
    });

    const liabilities = await this.prisma.account.aggregate({
      where: { type: 'LIABILITY' },
      _sum: { balance: true },
    });

    const equity = await this.prisma.account.aggregate({
      where: { type: 'EQUITY' },
      _sum: { balance: true },
    });

    return {
      totalAssets: assets._sum.balance || 0,
      totalLiabilities: liabilities._sum.balance || 0,
      totalEquity: equity._sum.balance || 0,
    };
  }
}
