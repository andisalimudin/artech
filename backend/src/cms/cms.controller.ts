// src/cms/cms.controller.ts
import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  @ApiOperation({ summary: 'Get landing page content' })
  getContent(@Query('section') section?: string) {
    return this.cmsService.getContent(section);
  }

  @Post(':section')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Update section content' })
  updateContent(@Param('section') section: string, @Body() data: any) {
    return this.cmsService.updateContent(section, data);
  }

  @Put(':section/toggle')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Toggle section visibility' })
  toggleSection(@Param('section') section: string, @Body('isActive') isActive: boolean) {
    return this.cmsService.toggleSection(section, isActive);
  }
}
