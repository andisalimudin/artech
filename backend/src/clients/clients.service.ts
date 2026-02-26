import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      return await this.prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw new InternalServerErrorException('Failed to create client');
    }
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        projects: true,
        _count: {
          select: { projects: true, invoices: true, quotations: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        projects: true,
        invoices: true,
        quotations: true,
      },
    });
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw new InternalServerErrorException('Failed to update client');
    }
  }

  async remove(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
