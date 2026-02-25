import { PrismaService } from '../prisma/prisma.service';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        project: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        project: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    }>;
    approve(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        date: Date;
        projectId: string | null;
        amount: import("@prisma/client/runtime/library").Decimal;
        category: string;
        receiptUrl: string | null;
        isApproved: boolean;
        approvedById: string | null;
        userId: string;
    }>;
}
