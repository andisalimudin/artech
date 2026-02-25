import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<({
        client: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        };
        manager: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        staffs: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        client: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        };
        manager: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        staffs: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
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
    }>;
    create(data: any): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
