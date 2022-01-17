import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { Project } from "../entities/Project";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const project = new Project();
    const properties = Object.getOwnPropertyNames(project);
    let hasInvalidQuery = false;
    Object.keys(req.query).forEach((k) => {
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
      req.query as { [key: string]: string | undefined }
    );

    const projects = await Project.find({ where: dbCondition });
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
