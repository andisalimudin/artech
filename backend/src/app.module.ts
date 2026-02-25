// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { InvoicesModule } from './invoices/invoices.module';
import { QuotationsModule } from './quotations/quotations.module';
import { ExpensesModule } from './expenses/expenses.module';
import { BookkeepingModule } from './bookkeeping/bookkeeping.module';
import { CmsModule } from './cms/cms.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    InvoicesModule,
    QuotationsModule,
    ExpensesModule,
    BookkeepingModule,
    CmsModule,
    ClientsModule,
  ],
})
export class AppModule {}
