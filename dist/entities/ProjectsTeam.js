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
exports.ProjectsTeam = void 0;
const typeorm_1 = require("typeorm");
let ProjectsTeam = class ProjectsTeam extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.number = "123456";
        this.team = "Design Lead";
        this.practice = "STRU";
        this.employee = "12345";
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 30 }),
    __metadata("design:type", String)
], ProjectsTeam.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 11 }),
    __metadata("design:type", String)
], ProjectsTeam.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProjectsTeam.prototype, "practice", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ProjectsTeam.prototype, "employee", void 0);
ProjectsTeam = __decorate([
    (0, typeorm_1.Entity)()
], ProjectsTeam);
exports.ProjectsTeam = ProjectsTeam;
//# sourceMappingURL=ProjectsTeam.js.map