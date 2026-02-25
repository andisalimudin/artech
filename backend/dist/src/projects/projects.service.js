"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.project.findMany({
            include: { client: true, manager: true, staffs: true },
        });
    }
    async findOne(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: { client: true, manager: true, staffs: true, invoices: true, quotations: true },
        });
    }
    async create(data) {
        const { staffs } = data, rest = __rest(data, ["staffs"]);
        return this.prisma.project.create({
            data: Object.assign(Object.assign({}, rest), { staffs: {
                    connect: staffs === null || staffs === void 0 ? void 0 : staffs.map((id) => ({ id })),
                } }),
        });
    }
    async update(id, data) {
        const { staffs } = data, rest = __rest(data, ["staffs"]);
        return this.prisma.project.update({
            where: { id },
            data: Object.assign(Object.assign({}, rest), { staffs: {
                    set: staffs === null || staffs === void 0 ? void 0 : staffs.map((id) => ({ id })),
                } }),
        });
    }
    async remove(id) {
        return this.prisma.project.delete({ where: { id } });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map