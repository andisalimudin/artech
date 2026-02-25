"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookkeepingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookkeepingService = class BookkeepingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAccounts() {
        return this.prisma.account.findMany();
    }
    async getTransactions(filters) {
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
    async createTransaction(data) {
        return this.prisma.transaction.create({
            data,
        });
    }
    async getProfitAndLoss(startDate, endDate) {
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
        const totalIncome = Number(income._sum.amount || 0);
        const totalExpense = Number(expenses._sum.amount || 0);
        return {
            totalIncome,
            totalExpense,
            netProfit: totalIncome - totalExpense,
        };
    }
    async getBalanceSheet(date) {
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
};
exports.BookkeepingService = BookkeepingService;
exports.BookkeepingService = BookkeepingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookkeepingService);
//# sourceMappingURL=bookkeeping.service.js.map