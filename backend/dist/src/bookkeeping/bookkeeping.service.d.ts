import { PrismaService } from '../prisma/prisma.service';
export declare class BookkeepingService {
    private prisma;
    constructor(prisma: PrismaService);
    getAccounts(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        type: string;
        balance: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    getTransactions(filters: any): Promise<({
        account: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            balance: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        accountId: string;
    })[]>;
    createTransaction(data: any): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        accountId: string;
    }>;
    getProfitAndLoss(startDate: string, endDate: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        netProfit: number;
    }>;
    getBalanceSheet(date: string): Promise<{
        totalAssets: number | import("@prisma/client/runtime/library").Decimal;
        totalLiabilities: number | import("@prisma/client/runtime/library").Decimal;
        totalEquity: number | import("@prisma/client/runtime/library").Decimal;
    }>;
}
