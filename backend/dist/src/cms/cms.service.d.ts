import { PrismaService } from '../prisma/prisma.service';
export declare class CmsService {
    private prisma;
    constructor(prisma: PrismaService);
    getContent(section?: string): Promise<{
        id: string;
        updatedAt: Date;
        section: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
    } | {
        id: string;
        updatedAt: Date;
        section: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
    }[]>;
    updateContent(section: string, data: any): Promise<{
        id: string;
        updatedAt: Date;
        section: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
    }>;
    toggleSection(section: string, isActive: boolean): Promise<{
        id: string;
        updatedAt: Date;
        section: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
    }>;
}
