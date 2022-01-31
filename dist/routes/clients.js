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
const ClientDetail_1 = require("../entities/ClientDetail");
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
        const skipCount = parseInt(top);
        const client = new ClientDetail_1.ClientDetail();
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
                    message: `Invalid query parameters exist. Valid query parameters are: ${properties.join(", ")}.`,
                },
            });
        }
        const dbCondition = (0, constructQuery_1.constructQuery)(dbQuery);
        const clients = await ClientDetail_1.ClientDetail.find({
            where: dbCondition,
            take: topCount,
            skip: skipCount,
        });
        if (clients.length === 0) {
            return res.status(404).json({ error: { message: "No clients found." } });
        }
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
router.get("/:clientKey", async (req, res) => {
    try {
        const client = await ClientDetail_1.ClientDetail.findOne({
            where: { clientKey: req.params.clientKey },
        });
        if (!client) {
            return res
                .status(404)
                .json({ error: { message: "Client does not exist." } });
        }
        return res.status(200).json(ClientDetail_1.ClientDetail);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=clients.js.map