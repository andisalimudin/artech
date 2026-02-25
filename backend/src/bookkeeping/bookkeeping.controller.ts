// src/bookkeeping/bookkeeping.controller.ts
import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { BookkeepingService } from './bookkeeping.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

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
