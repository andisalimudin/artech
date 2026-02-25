import { QuotationsService } from './quotations.service';
export declare class QuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: QuotationsService);
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
        items: {
            id: string;
            description: string;
            quotationId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
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
        items: {
            id: string;
            description: string;
            quotationId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
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
    }>;
    create(data: any): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    convertToInvoice(id: string): Promise<{
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
    }>;
}
