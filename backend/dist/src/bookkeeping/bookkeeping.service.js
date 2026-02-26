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
    async getTransactions(query) {
        const { startDate, endDate, type, category } = query;
        const where = {};
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }
        if (type) {
            where.type = type;
        }
        return this.prisma.transaction.findMany({
            where,
            orderBy: { date: 'desc' },
            include: { account: true }
        });
    }
    async createTransaction(data) {
        let account = await this.prisma.account.findFirst({
            where: { name: data.category }
        });
        if (!account) {
            const code = `${data.type === 'INCOME' ? '4' : '5'}${Date.now().toString().slice(-4)}`;
            account = await this.prisma.account.create({
                data: {
                    name: data.category,
                    code: code,
                    type: data.type,
                    balance: 0
                }
            });
        }
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
                type: data.type,
                accountId: account.id,
                receiptUrl: data.receiptUrl
            },
        });
    }
    async updateTransaction(id, data) {
        const oldTransaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: { account: true }
        });
        if (!oldTransaction) {
            throw new Error('Transaction not found');
        }
        await this.prisma.account.update({
            where: { id: oldTransaction.accountId },
            data: {
                balance: {
                    decrement: Number(oldTransaction.amount)
                }
            }
        });
        let account = await this.prisma.account.findFirst({
            where: { name: data.category }
        });
        if (!account) {
            const code = `${data.type === 'INCOME' ? '4' : '5'}${Date.now().toString().slice(-4)}`;
            account = await this.prisma.account.create({
                data: {
                    name: data.category,
                    code: code,
                    type: data.type,
                    balance: 0
                }
            });
        }
        await this.prisma.account.update({
            where: { id: account.id },
            data: {
                balance: {
                    increment: Number(data.amount)
                }
            }
        });
        return this.prisma.transaction.update({
            where: { id },
            data: {
                date: new Date(data.date),
                description: data.description,
                amount: data.amount,
                type: data.type,
                accountId: account.id,
                receiptUrl: data.receiptUrl
            }
        });
    }
    async deleteTransaction(id) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: { account: true }
        });
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        await this.prisma.account.update({
            where: { id: transaction.accountId },
            data: {
                balance: {
                    decrement: Number(transaction.amount)
                }
            }
        });
        return this.prisma.transaction.delete({
            where: { id }
        });
    }
    async getProfitAndLoss(startDate, endDate) {
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
    async getBalanceSheet(date) {
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
};
exports.BookkeepingService = BookkeepingService;
exports.BookkeepingService = BookkeepingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookkeepingService);
//# sourceMappingURL=bookkeeping.service.js.map