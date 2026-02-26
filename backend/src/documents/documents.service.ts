import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.Multer.File, projectId: string, userId: string, folder: string = 'root') {
    return this.prisma.document.create({
      data: {
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        type: file.mimetype,
        size: file.size,
        projectId,
        uploadedById: userId,
        folder,
      },
    });
  }

  async findAll(projectId: string) {
    return this.prisma.document.findMany({
      where: { projectId },
      include: {
        uploadedBy: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async remove(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
