import { PrismaService } from '../prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    findAll(): Promise<({
        projects: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
            budget: import("@prisma/client/runtime/library").Decimal;
            progress: number;
            startDate: Date | null;
            endDate: Date | null;
            clientId: string;
            managerId: string | null;
        }[];
        _count: {
            projects: number;
            quotations: number;
            invoices: number;
        };
    } & {
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    })[]>;
    findOne(id: string): Promise<{
        projects: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
            budget: import("@prisma/client/runtime/library").Decimal;
            progress: number;
            startDate: Date | null;
            endDate: Date | null;
            clientId: string;
            managerId: string | null;
        }[];
        quotations: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            clientId: string;
            date: Date;
            expiryDate: Date | null;
            subTotal: import("@prisma/client/runtime/library").Decimal;
            taxRate: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            projectId: string | null;
        }[];
        invoices: {
            number: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.InvoiceStatus;
            clientId: string;
            date: Date;
            subTotal: import("@prisma/client/runtime/library").Decimal;
            taxRate: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
            projectId: string | null;
            dueDate: Date;
            amountPaid: import("@prisma/client/runtime/library").Decimal;
            amountRemaining: import("@prisma/client/runtime/library").Decimal;
            quotationId: string | null;
        }[];
    } & {
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
}
