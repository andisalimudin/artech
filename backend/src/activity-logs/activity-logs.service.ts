import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  async log(action: string, details: string, userId?: string, projectId?: string, taskId?: string) {
    return this.prisma.activityLog.create({
      data: {
        action,
        details,
        userId,
        projectId,
        taskId
      },
    });
  }

  async findAll(query: any) {
    const { projectId, taskId, userId, limit } = query;
    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (taskId) where.taskId = taskId;
    if (userId) where.userId = userId;

    return this.prisma.activityLog.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        task: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? Number(limit) : 50
    });
  }
}
