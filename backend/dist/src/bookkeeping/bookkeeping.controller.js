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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookkeepingController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const bookkeeping_service_1 = require("./bookkeeping.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let BookkeepingController = class BookkeepingController {
    constructor(bookkeepingService) {
        this.bookkeepingService = bookkeepingService;
    }
    getAccounts() {
        return this.bookkeepingService.getAccounts();
    }
    getTransactions(query) {
        return this.bookkeepingService.getTransactions(query);
    }
    createTransaction(data) {
        return this.bookkeepingService.createTransaction(data);
    }
    updateTransaction(id, data) {
        return this.bookkeepingService.updateTransaction(id, data);
    }
    deleteTransaction(id) {
        return this.bookkeepingService.deleteTransaction(id);
    }
    uploadFile(file) {
        return { url: `/uploads/${file.filename}` };
    }
    getProfitAndLoss(startDate, endDate) {
        return this.bookkeepingService.getProfitAndLoss(startDate, endDate);
    }
    getBalanceSheet(date) {
        return this.bookkeepingService.getBalanceSheet(date);
    }
};
exports.BookkeepingController = BookkeepingController;
__decorate([
    (0, common_1.Get)('accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all accounts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transactions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)('transactions'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a transaction' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Put)('transactions/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a transaction' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "updateTransaction", null);
__decorate([
    (0, common_1.Delete)('transactions/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a transaction' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "deleteTransaction", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a receipt file' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('reports/pnl'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Profit and Loss report' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "getProfitAndLoss", null);
__decorate([
    (0, common_1.Get)('reports/balance-sheet'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Balance Sheet report' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookkeepingController.prototype, "getBalanceSheet", null);
exports.BookkeepingController = BookkeepingController = __decorate([
    (0, swagger_1.ApiTags)('bookkeeping'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('bookkeeping'),
    __metadata("design:paramtypes", [bookkeeping_service_1.BookkeepingService])
], BookkeepingController);
//# sourceMappingURL=bookkeeping.controller.js.map