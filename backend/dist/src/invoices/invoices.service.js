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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.invoice.findMany({
            include: { client: true, project: true, items: true, payments: true },
        });
    }
    async findOne(id) {
        return this.prisma.invoice.findUnique({
            where: { id },
            include: { client: true, project: true, items: true, payments: true },
        });
    }
    async create(data) {
        const { items } = data, rest = __rest(data, ["items"]);
        const count = await this.prisma.invoice.count();
        const number = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
        let subTotal = 0;
        const itemsData = items.map((item) => {
            const total = item.quantity * item.unitPrice;
            subTotal += total;
            return Object.assign(Object.assign({}, item), { totalPrice: total });
        });
        const taxRate = 0.06;
        const taxAmount = subTotal * taxRate;
        const total = subTotal + taxAmount;
        return this.prisma.invoice.create({
            data: Object.assign(Object.assign({}, rest), { number,
                subTotal,
                taxRate,
                taxAmount,
                total, amountRemaining: total, items: {
                    create: itemsData,
                } }),
        });
    }
    async update(id, data) {
        const { items } = data, rest = __rest(data, ["items"]);
        if (items) {
            let subTotal = 0;
            const itemsData = items.map((item) => {
                const total = item.quantity * item.unitPrice;
                subTotal += total;
                return Object.assign(Object.assign({}, item), { totalPrice: total });
            });
            const taxRate = 0.06;
            const taxAmount = subTotal * taxRate;
            const total = subTotal + taxAmount;
            await this.prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
            return this.prisma.invoice.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { subTotal,
                    taxAmount,
                    total, amountRemaining: total - (rest.amountPaid || 0), items: {
                        create: itemsData,
                    } }),
            });
        }
        return this.prisma.invoice.update({
            where: { id },
            data: rest,
        });
    }
    async remove(id) {
        return this.prisma.invoice.delete({ where: { id } });
    }
    async addPayment(id, data) {
        const invoice = await this.findOne(id);
        if (!invoice)
            throw new Error('Invoice not found');
        const amountPaid = parseFloat(invoice.amountPaid.toString()) + data.amount;
        const amountRemaining = parseFloat(invoice.total.toString()) - amountPaid;
        let status = 'PARTIAL';
        if (amountRemaining <= 0)
            status = 'PAID';
        return this.prisma.payment.create({
            data: {
                amount: data.amount,
                date: data.date || new Date(),
                paymentMethod: data.paymentMethod,
                reference: data.reference,
                invoiceId: id,
            },
        }).then(() => {
            return this.prisma.invoice.update({
                where: { id },
                data: {
                    amountPaid,
                    amountRemaining,
                    status,
                },
            });
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map