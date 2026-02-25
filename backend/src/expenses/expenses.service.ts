// src/expenses/expenses.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.expense.findMany({
      include: { user: true, project: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
      include: { user: true, project: true },
    });
  }

  async create(data: any) {
    return this.prisma.expense.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.expense.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.expense.delete({ where: { id } });
  }

  async approve(id: string, userId: string) {
    return this.prisma.expense.update({
      where: { id },
      data: {
        isApproved: true,
        approvedById: userId,
      },
    });
  }
}
