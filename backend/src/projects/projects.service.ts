// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      include: { client: true, manager: true, staffs: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { client: true, manager: true, staffs: true, invoices: true, quotations: true },
    });
  }

  async create(data: any) {
    const { staffs, startDate, endDate, budget, ...rest } = data;
    
    // Generate Project Code: P-YYYY-001
    const year = new Date().getFullYear();
    const count = await this.prisma.project.count();
    const code = `P-${year}-${(count + 1).toString().padStart(3, '0')}`;

    // Sanitize dates: Convert empty strings to null, valid strings to Date
    const validStartDate = startDate ? new Date(startDate) : undefined;
    const validEndDate = endDate ? new Date(endDate) : undefined;
    
    // Sanitize budget
    const validBudget = budget ? Number(budget) : 0;

    return this.prisma.project.create({
      data: {
        ...rest,
        code,
        startDate: validStartDate,
        endDate: validEndDate,
        budget: validBudget,
        staffs: {
          connect: staffs?.map((id: string) => ({ id })),
        },
      },
    });
  }

  async update(id: string, data: any) {
    const { staffs, startDate, endDate, budget, ...rest } = data;
    
    const validStartDate = startDate ? new Date(startDate) : undefined;
    const validEndDate = endDate ? new Date(endDate) : undefined;
    const validBudget = (budget !== undefined && budget !== null) ? Number(budget) : undefined;

    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        startDate: validStartDate,
        endDate: validEndDate,
        budget: validBudget,
        staffs: {
          set: staffs?.map((id: string) => ({ id })),
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
