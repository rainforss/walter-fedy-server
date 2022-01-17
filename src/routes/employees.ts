import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { Employee } from "../entities/Employee";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employee = new Employee();
    const properties = Object.getOwnPropertyNames(employee);
    let hasInvalidQuery = false;
    Object.keys(req.query).forEach((k) => {
      if (properties.findIndex((p) => p === k) === -1) {
        return (hasInvalidQuery = true);
      }
      return;
    });

    if (hasInvalidQuery) {
      return res
        .status(400)
        .json({
          error: {
            message: `Invalid query parameters exist. Valid query parameters are: ${properties.join(
              ", "
            )}.`,
          },
        });
    }

    const dbCondition = constructQuery(
      req.query as { [key: string]: string | undefined }
    );

    const employees = await Employee.find({ where: dbCondition });
    if (employees.length === 0) {
      return res
        .status(404)
        .json({ error: { message: "No employees found." } });
    }
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:Id", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { employee: req.params.Id },
    });
    if (!employee) {
      return res
        .status(404)
        .json({ error: { message: "Employee does not exist." } });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
