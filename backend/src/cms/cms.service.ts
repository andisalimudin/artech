// src/cms/cms.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  async getContent(section?: string) {
    if (section) {
      return this.prisma.landingPageContent.findUnique({ where: { section } });
    }
    return this.prisma.landingPageContent.findMany();
  }

  async updateContent(section: string, data: any) {
    return this.prisma.landingPageContent.upsert({
      where: { section },
      update: { content: data, updatedAt: new Date() },
      create: { section, content: data },
    });
  }

  async toggleSection(section: string, isActive: boolean) {
    return this.prisma.landingPageContent.update({
      where: { section },
      data: { isActive },
    });
  }
}
