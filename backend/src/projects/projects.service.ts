// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private activityLogsService: ActivityLogsService
  ) {}

  async findAll() {
    return this.prisma.project.findMany({
      include: { client: true, manager: true, staffs: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { 
        client: true, 
        manager: true, 
        staffs: true, 
        invoices: true, 
        quotations: true,
        tasks: { include: { assignedTo: true } },
        documents: { include: { uploadedBy: true } },
        activityLogs: { include: { user: true }, orderBy: { createdAt: 'desc' } }
      },
    });
  }

  async create(data: any) {
    console.log('ProjectsService.create input:', data);
    try {
      const { staffs, startDate, endDate, budget, userId, ...rest } = data;
      
      // Generate Project Code: P-YYYY-001
      const year = new Date().getFullYear();
      const count = await this.prisma.project.count();
      const code = `P-${year}-${(count + 1).toString().padStart(3, '0')}`;

      // Sanitize dates
      const validStartDate = startDate ? new Date(startDate) : undefined;
      const validEndDate = endDate ? new Date(endDate) : undefined;
      const validBudget = budget ? Number(budget) : 0;

      const projectData: any = {
        ...rest,
        code,
        startDate: validStartDate,
        endDate: validEndDate,
        budget: validBudget,
      };

      if (staffs && Array.isArray(staffs) && staffs.length > 0) {
        projectData.staffs = {
          connect: staffs.map((id: string) => ({ id })),
        };
      }

      const project = await this.prisma.project.create({
        data: projectData,
      });

      try {
        if (userId) {
          await this.activityLogsService.log(
            'PROJECT_CREATED',
            `Project ${project.name} created`,
            userId,
            project.id
          );
        }
      } catch (logError) {
        console.error('Failed to create activity log:', logError);
      }

      return project;
    } catch (error) {
      console.error('ProjectsService.create error:', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    const { staffs, startDate, endDate, budget, userId, ...rest } = data;
    
    const validStartDate = startDate ? new Date(startDate) : undefined;
    const validEndDate = endDate ? new Date(endDate) : undefined;
    const validBudget = (budget !== undefined && budget !== null) ? Number(budget) : undefined;

    const project = await this.prisma.project.update({
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

    await this.activityLogsService.log(
      'PROJECT_UPDATED',
      `Project ${project.name} updated`,
      userId,
      project.id
    );

    return project;
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
