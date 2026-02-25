import { BookkeepingService } from './bookkeeping.service';
export declare class BookkeepingController {
    private readonly bookkeepingService;
    constructor(bookkeepingService: BookkeepingService);
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
