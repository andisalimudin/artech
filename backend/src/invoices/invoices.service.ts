// src/invoices/invoices.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.invoice.findMany({
      include: { client: true, project: true, items: true, payments: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { client: true, project: true, items: true, payments: true },
    });
  }

  async create(data: any) {
    const { items, ...rest } = data;
    const count = await this.prisma.invoice.count();
    const number = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
    
    let subTotal = 0;
    const itemsData = items.map((item: any) => {
      const total = item.quantity * item.unitPrice;
      subTotal += total;
      return { ...item, totalPrice: total };
    });

    const taxRate = 0.06;
    const taxAmount = subTotal * taxRate;
    const total = subTotal + taxAmount;

    return this.prisma.invoice.create({
      data: {
        ...rest,
        number,
        subTotal,
        taxRate,
        taxAmount,
        total,
        amountRemaining: total,
        items: {
          create: itemsData,
        },
      },
    });
  }

  async update(id: string, data: any) {
    const { items, ...rest } = data;
    
    // Recalculate if items changed
    if (items) {
      let subTotal = 0;
      const itemsData = items.map((item: any) => {
        const total = item.quantity * item.unitPrice;
        subTotal += total;
        return { ...item, totalPrice: total };
      });
      const taxRate = 0.06;
      const taxAmount = subTotal * taxRate;
      const total = subTotal + taxAmount;

      await this.prisma.invoiceItem.deleteMany({ where: { invoiceId: id } });
      return this.prisma.invoice.update({
        where: { id },
        data: {
          ...rest,
          subTotal,
          taxAmount,
          total,
          amountRemaining: total - (rest.amountPaid || 0),
          items: {
            create: itemsData,
          },
        },
      });
    }

    return this.prisma.invoice.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }

  async addPayment(id: string, data: any) {
    const invoice = await this.findOne(id);
    if (!invoice) throw new Error('Invoice not found');

    const amountPaid = parseFloat(invoice.amountPaid.toString()) + data.amount;
    const amountRemaining = parseFloat(invoice.total.toString()) - amountPaid;
    let status: 'PAID' | 'PARTIAL' | 'UNPAID' = 'PARTIAL';
    if (amountRemaining <= 0) status = 'PAID';

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
}
