import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus, Priority } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { projectId, assignedToId, ...rest } = data;
    
    // Create Task
    const task = await this.prisma.task.create({
      data: {
        ...rest,
        projectId,
        assignedToId: assignedToId || null,
      },
    });

    // Update Project Progress
    await this.updateProjectProgress(projectId);

    return task;
  }

  async findAll(query: any) {
    const { projectId, assignedToId } = query;
    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (assignedToId) where.assignedToId = assignedToId;

    return this.prisma.task.findMany({
      where,
      include: {
        project: true,
        assignedTo: true,
        subtasks: true,
        _count: { select: { comments: true, attachments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        assignedTo: true,
        subtasks: true,
        comments: { include: { user: true }, orderBy: { createdAt: 'desc' } },
        attachments: true
      }
    });
  }

  async update(id: string, data: any) {
    const { projectId, ...rest } = data;
    const task = await this.prisma.task.update({
      where: { id },
      data: rest,
    });

    // Update Project Progress
    if (task.projectId) {
      await this.updateProjectProgress(task.projectId);
    }

    return task;
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    await this.prisma.task.delete({ where: { id } });
    
    if (task?.projectId) {
      await this.updateProjectProgress(task.projectId);
    }
    
    return { success: true };
  }

  // Helper to calculate and update project progress
  private async updateProjectProgress(projectId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      select: { status: true }
    });

    if (tasks.length === 0) {
      await this.prisma.project.update({
        where: { id: projectId },
        data: { progress: 0 }
      });
      return;
    }

    const completedTasks = tasks.filter(t => t.status === 'DONE').length;
    const progress = Math.round((completedTasks / tasks.length) * 100);

    await this.prisma.project.update({
      where: { id: projectId },
      data: { progress }
    });
  }
}
