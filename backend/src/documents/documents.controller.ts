import { Controller, Get, Post, Delete, Param, Query, UseGuards, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        projectId: { type: 'string' },
        folder: { type: 'string', default: 'root' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body('projectId') projectId: string,
    @Body('folder') folder: string,
    @Req() req,
  ) {
    return this.documentsService.create(file, projectId, req.user.userId, folder);
  }

  @Get()
  @ApiOperation({ summary: 'Get documents by project ID' })
  findAll(@Query('projectId') projectId: string) {
    return this.documentsService.findAll(projectId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
