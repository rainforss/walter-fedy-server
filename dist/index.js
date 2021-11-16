"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projects_1 = __importDefault(require("./routes/projects"));
const clients_1 = __importDefault(require("./routes/clients"));
const main = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
    app.use("/api/projects", projects_1.default);
    app.use("api/clients", clients_1.default);
    app.listen(process.env.PORT || 5000, () => console.log(`Server started at port ${process.env.PORT || 5000}.`));
};
main().catch((error) => console.log(error));
//# sourceMappingURL=index.js.map