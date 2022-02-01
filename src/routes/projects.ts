import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { Project } from "../entities/Project";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //Check for top and skip query strings so that we do not return thousands of records for projects
    const { top, skip, ...dbQuery } = req.query;
    if (!top || !skip) {
      return res.status(404).json({
        error: {
          message:
            "You must have 'top' and 'skip' query strings in the request URL.",
        },
      });
    }
    const topCount = parseInt(top as string);
    const skipCount = parseInt(skip as string);

    //Check for any invalid query strings against properties of Project object
    const project = new Project();
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
          message: `Invalid query parameters exist. Valid query parameters are: ${properties.join(
            ", "
          )}.`,
        },
      });
    }
    const dbCondition = constructQuery(
      dbQuery as { [key: string]: string | undefined }
    );

    const projects = await Project.find({
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
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:projectNumber", async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { projectNumber: req.params.projectNumber },
    });
    if (!project) {
      return res
        .status(404)
        .json({ error: { message: "Project does not exist." } });
    }
    return res.status(200).json(Project);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
