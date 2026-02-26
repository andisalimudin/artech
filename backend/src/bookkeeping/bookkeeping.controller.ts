import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BookkeepingService } from './bookkeeping.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('bookkeeping')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookkeeping')
export class BookkeepingController {
  constructor(private readonly bookkeepingService: BookkeepingService) {}

  @Get('accounts')
  @ApiOperation({ summary: 'Get all accounts' })
  getAccounts() {
    return this.bookkeepingService.getAccounts();
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get transactions' })
  getTransactions(@Query() query: any) {
    return this.bookkeepingService.getTransactions(query);
  }

  @Post('transactions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Create a transaction' })
  createTransaction(@Body() data: any) {
    return this.bookkeepingService.createTransaction(data);
  }

  @Put('transactions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Update a transaction' })
  updateTransaction(@Param('id') id: string, @Body() data: any) {
    return this.bookkeepingService.updateTransaction(id, data);
  }

  @Delete('transactions/:id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Delete a transaction' })
  deleteTransaction(@Param('id') id: string) {
    return this.bookkeepingService.deleteTransaction(id);
  }

  @Post('upload')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload a receipt file' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` };
  }

  @Get('reports/pnl')
  @ApiOperation({ summary: 'Get Profit and Loss report' })
  getProfitAndLoss(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.bookkeepingService.getProfitAndLoss(startDate, endDate);
  }

  @Get('reports/balance-sheet')
  @ApiOperation({ summary: 'Get Balance Sheet report' })
  getBalanceSheet(@Query('date') date: string) {
    return this.bookkeepingService.getBalanceSheet(date);
  }
}
