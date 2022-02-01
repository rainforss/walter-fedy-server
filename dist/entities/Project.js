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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
let Project = class Project extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 30 }),
    __metadata("design:type", String)
], Project.prototype, "projectNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 9 }),
    __metadata("design:type", String)
], Project.prototype, "family", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 40 }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 11 }),
    __metadata("design:type", String)
], Project.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Project.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 50 }),
    __metadata("design:type", String)
], Project.prototype, "superSector", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255 }),
    __metadata("design:type", String)
], Project.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 7 }),
    __metadata("design:type", String)
], Project.prototype, "constructionValue", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 }),
    __metadata("design:type", String)
], Project.prototype, "ownerClient", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 32 }),
    __metadata("design:type", String)
], Project.prototype, "billingClient", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 20 }),
    __metadata("design:type", String)
], Project.prototype, "projectManager", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Project.prototype, "designStart", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Project.prototype, "designEnd", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Project.prototype, "constructionStart", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], Project.prototype, "constructionEnd", void 0);
Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
exports.Project = Project;
//# sourceMappingURL=Project.js.map