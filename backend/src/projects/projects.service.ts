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
    const { staffs, ...rest } = data;
    return this.prisma.project.create({
      data: {
        ...rest,
        staffs: {
          connect: staffs?.map((id: string) => ({ id })),
        },
      },
    });
  }

  async update(id: string, data: any) {
    const { staffs, ...rest } = data;
    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
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
