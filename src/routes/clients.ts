import express from "express";
import { constructQuery } from "../utils/constructQuery";
import { ClientDetail } from "../entities/ClientDetail";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = new ClientDetail();
    const properties = Object.getOwnPropertyNames(client);
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

    const clients = await ClientDetail.find({ where: dbCondition });
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
