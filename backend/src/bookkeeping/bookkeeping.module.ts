// src/bookkeeping/bookkeeping.module.ts
import { Module } from '@nestjs/common';
import { BookkeepingService } from './bookkeeping.service';
import { BookkeepingController } from './bookkeeping.controller';

@Module({
  providers: [BookkeepingService],
  controllers: [BookkeepingController],
  exports: [BookkeepingService],
})
export class BookkeepingModule {}
