"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constructQuery_1 = require("../utils/constructQuery");
const Project_1 = require("../entities/Project");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const _a = req.query, { top, skip } = _a, dbQuery = __rest(_a, ["top", "skip"]);
        if (!top || !skip) {
            return res.status(404).json({
                error: {
                    message: "You must have 'top' and 'skip' query strings in the request URL.",
                },
            });
        }
        const topCount = parseInt(top);
        const skipCount = parseInt(skip);
        const project = new Project_1.Project();
        const properties = Object.getOwnPropertyNames(project);
        let hasInvalidQuery = false;
        Object.keys(dbQuery).forEach((k) => {
            if (properties.findIndex((p) => p === k) === -1) {
                return (hasInvalidQuery = true);
            }
            return;
        });
        if (hasInvalidQuery) {
            return res.status(400).json({
                error: {
                    message: `Invalid query parameters exist. Valid query parameters are: ${properties.join(", ")}.`,
                },
            });
        }
        const dbCondition = (0, constructQuery_1.constructQuery)(dbQuery);
        const projects = await Project_1.Project.find({
            where: dbCondition,
            skip: skipCount,
            take: topCount,
            order: {
                projectNumber: "DESC",
            },
        });
        if (projects.length === 0) {
            return res.status(404).json({ error: { message: "No projects found." } });
        }
        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
router.get("/:projectNumber", async (req, res) => {
    try {
        const project = await Project_1.Project.findOne({
            where: { projectNumber: req.params.projectNumber },
        });
        if (!project) {
            return res
                .status(404)
                .json({ error: { message: "Project does not exist." } });
        }
        return res.status(200).json(Project_1.Project);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=projects.js.map