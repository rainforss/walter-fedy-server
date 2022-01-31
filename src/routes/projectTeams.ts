import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { ProjectsTeam } from "../entities/ProjectsTeam";

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
    const projectTeam = new ProjectsTeam();
    const properties = Object.getOwnPropertyNames(projectTeam);
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

    const projectTeams = await ProjectsTeam.find({
      where: dbCondition,
      take: topCount,
      skip: skipCount,
    });
    if (projectTeams.length === 0) {
      return res
        .status(404)
        .json({ error: { message: "No project teams found." } });
    }
    return res.status(200).json(projectTeams);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:number", async (req, res) => {
  try {
    const projectTeam = await ProjectsTeam.findOne({
      where: { number: req.params.number },
    });
    if (!projectTeam) {
      return res
        .status(404)
        .json({ error: { message: "Project team does not exist." } });
    }
    return res.status(200).json(projectTeam);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
