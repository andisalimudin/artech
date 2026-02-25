// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Create Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@artech.com' },
    update: {},
    create: {
      email: 'admin@artech.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  // 2. Create Chart of Accounts
  const accounts = [
    { code: '1000', name: 'Cash at Bank', type: 'ASSET' },
    { code: '2000', name: 'Accounts Payable', type: 'LIABILITY' },
    { code: '3000', name: 'Retained Earnings', type: 'EQUITY' },
    { code: '4000', name: 'Sales Revenue', type: 'INCOME' },
    { code: '5000', name: 'Software Licenses', type: 'EXPENSE' },
    { code: '5100', name: 'Marketing', type: 'EXPENSE' },
  ];

  for (const acc of accounts) {
    await prisma.account.upsert({
      where: { code: acc.code },
      update: {},
      create: acc,
    });
  }

  // 3. Create initial CMS content
  const cmsSections = [
    {
      section: 'hero',
      content: {
        headline: 'Modern Solutions for Next-Gen Tech Companies',
        subheadline: 'Streamline your project management, financial tracking, and client relations with Artech\'s all-in-one portal.',
        cta: 'Get Started'
      }
    },
    {
      section: 'services',
      content: [
        { title: 'Software Development', description: 'Custom software solutions for your business.' },
        { title: 'Cloud Computing', description: 'Scalable cloud infrastructure.' },
        { title: 'AI & Data Analytics', description: 'Actionable insights from your data.' }
      ]
    }
  ];

  for (const cms of cmsSections) {
    await prisma.landingPageContent.upsert({
      where: { section: cms.section },
      update: { content: cms.content as any },
      create: { section: cms.section, content: cms.content as any },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
