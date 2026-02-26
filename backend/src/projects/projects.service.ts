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
      let code: string;
      let isUnique = false;
      let attempt = 0;

      // Retry logic for unique code generation
      while (!isUnique && attempt < 5) {
        const count = await this.prisma.project.count();
        const sequence = count + 1 + attempt;
        code = `P-${year}-${sequence.toString().padStart(3, '0')}`;
        
        const existing = await this.prisma.project.findUnique({ where: { code } });
        if (!existing) {
          isUnique = true;
        } else {
          attempt++;
        }
      }

      if (!isUnique) {
        throw new Error('Failed to generate unique project code');
      }

      // Sanitize dates
      const validStartDate = startDate ? new Date(startDate) : undefined;
      const validEndDate = endDate ? new Date(endDate) : undefined;
      const validBudget = budget ? Number(budget) : 0;

      const projectData: any = {
        ...rest,
        code: code!,
        startDate: validStartDate,
        endDate: validEndDate,
        budget: validBudget,
      };

      if (staffs && Array.isArray(staffs) && staffs.length > 0) {
        projectData.staffs = {
          connect: staffs.map((id: string) => ({ id })),
        };
      }

      console.log('Prisma create data:', JSON.stringify(projectData, null, 2));

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
      // Add more context to the error
      if (error.code === 'P2002') {
         throw new Error(`Unique constraint violation: ${error.meta?.target}`);
      }
      if (error.code === 'P2003') {
         throw new Error(`Foreign key constraint violation: ${error.meta?.field_name}`);
      }
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
