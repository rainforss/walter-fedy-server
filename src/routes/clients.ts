import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { ClientDetail } from "../entities/ClientDetail";

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
    const skipCount = parseInt(top as string);
    const client = new ClientDetail();
    const properties = Object.getOwnPropertyNames(client);
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

    const clients = await ClientDetail.find({
      where: dbCondition,
      take: topCount,
      skip: skipCount,
    });
    if (clients.length === 0) {
      return res.status(404).json({ error: { message: "No clients found." } });
    }
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:clientKey", async (req, res) => {
  try {
    const client = await ClientDetail.findOne({
      where: { clientKey: req.params.clientKey },
    });
    if (!client) {
      return res
        .status(404)
        .json({ error: { message: "Client does not exist." } });
    }
    return res.status(200).json(ClientDetail);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
