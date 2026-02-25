import { CmsService } from './cms.service';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
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
