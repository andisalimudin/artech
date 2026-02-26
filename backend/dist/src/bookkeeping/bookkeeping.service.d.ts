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
    getTransactions(query: any): Promise<({
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
        updatedAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        receiptUrl: string | null;
        accountId: string;
    })[]>;
    createTransaction(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        receiptUrl: string | null;
        accountId: string;
    }>;
    updateTransaction(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        receiptUrl: string | null;
        accountId: string;
    }>;
    deleteTransaction(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        description: string;
        date: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        receiptUrl: string | null;
        accountId: string;
    }>;
    getProfitAndLoss(startDate: string, endDate: string): Promise<{
        startDate: Date;
        endDate: Date;
        income: number;
        expenses: number;
        netProfit: number;
    }>;
    getBalanceSheet(date: string): Promise<{
        assets: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            balance: import("@prisma/client/runtime/library").Decimal;
        }[];
        liabilities: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            balance: import("@prisma/client/runtime/library").Decimal;
        }[];
        equity: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            type: string;
            balance: import("@prisma/client/runtime/library").Decimal;
        }[];
        totalAssets: number;
        totalLiabilities: number;
        totalEquity: number;
    }>;
}
