"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constructQuery_1 = require("../utils/constructQuery");
const Employee_1 = require("../entities/Employee");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const dbCondition = (0, constructQuery_1.constructQuery)(req.query);
        const employees = await Employee_1.Employee.find({ where: dbCondition });
        if (employees.length === 0) {
            return res
                .status(404)
                .json({ error: { message: "No employees found." } });
        }
        return res.status(200).json(employees);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
router.get("/:Id", async (req, res) => {
    try {
        const employee = await Employee_1.Employee.findOne({
            where: { employee: req.params.Id },
        });
        if (!employee) {
            return res
                .status(404)
                .json({ error: { message: "Employee does not exist." } });
        }
        return res.status(200).json(employee);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=employees.js.map