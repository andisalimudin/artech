// src/projects/projects.service.ts
import { Injectable, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { ProjectStatus, Prisma } from '@prisma/client';

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

      if (!rest?.clientId) {
        throw new BadRequestException('clientId is required');
      }
      
      // Generate Project Code: P-YYYY-001
      const year = new Date().getFullYear();
      let code: string;
      let isUnique = false;
      let attempt = 0;

      // Retry logic for unique code generation
      // Use timestamp component to ensure uniqueness in high concurrency/conflict scenarios
      while (!isUnique && attempt < 10) {
        
        // Better approach: Find the last created project code to determine next sequence
        const lastProject = await this.prisma.project.findFirst({
           orderBy: { createdAt: 'desc' },
           where: { code: { startsWith: `P-${year}-` } },
           select: { code: true }
        });

        let nextSeq = 1 + attempt;
        if (lastProject && lastProject.code) {
            const parts = lastProject.code.split('-');
            if (parts.length === 3) {
                const lastSeq = parseInt(parts[2]);
                if (!isNaN(lastSeq)) {
                    nextSeq = lastSeq + 1 + attempt;
                }
            }
        }

        code = `P-${year}-${nextSeq.toString().padStart(3, '0')}`;
        
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
      const validBudget = (budget !== undefined && budget !== null && budget !== '')
        ? Number(budget)
        : 0;

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Project code already exists');
        }
        if (error.code === 'P2003') {
          throw new BadRequestException('Invalid reference for client or staff');
        }
      }
      throw new InternalServerErrorException('Failed to create project');
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
