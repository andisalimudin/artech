// src/quotations/quotations.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.quotation.findMany({
      include: { client: true, project: true, items: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.quotation.findUnique({
      where: { id },
      include: { client: true, project: true, items: true },
    });
  }

  async create(data: any) {
    const { items, ...rest } = data;
    const count = await this.prisma.quotation.count();
    const number = `QT-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
    
    let subTotal = 0;
    const itemsData = items.map((item: any) => {
      const total = item.quantity * item.unitPrice;
      subTotal += total;
      return { ...item, totalPrice: total };
    });

    const taxRate = 0.06;
    const taxAmount = subTotal * taxRate;
    const total = subTotal + taxAmount;

    return this.prisma.quotation.create({
      data: {
        ...rest,
        number,
        subTotal,
        taxRate,
        taxAmount,
        total,
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

      await this.prisma.quotationItem.deleteMany({ where: { quotationId: id } });
      return this.prisma.quotation.update({
        where: { id },
        data: {
          ...rest,
          subTotal,
          taxAmount,
          total,
          items: {
            create: itemsData,
          },
        },
      });
    }

    return this.prisma.quotation.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.quotation.delete({ where: { id } });
  }

  async convertToInvoice(id: string) {
    const quotation = await this.findOne(id);
    if (!quotation) throw new Error('Quotation not found');

    const invoiceCount = await this.prisma.invoice.count();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(invoiceCount + 1).toString().padStart(4, '0')}`;

    const invoice = await this.prisma.invoice.create({
      data: {
        number: invoiceNumber,
        date: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        subTotal: quotation.subTotal,
        taxRate: quotation.taxRate,
        taxAmount: quotation.taxAmount,
        total: quotation.total,
        amountRemaining: quotation.total,
        clientId: quotation.clientId,
        projectId: quotation.projectId,
        quotationId: quotation.id,
        items: {
          create: quotation.items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });

    await this.prisma.quotation.update({
      where: { id },
      data: { status: 'CONVERTED' },
    });

    return invoice;
  }
}
