"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const projects_1 = __importDefault(require("./routes/projects"));
const clients_1 = __importDefault(require("./routes/clients"));
const employees_1 = __importDefault(require("./routes/employees"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Employee_1 = require("./entities/Employee");
const ClientDetail_1 = require("./entities/ClientDetail");
const Project_1 = require("./entities/Project");
dotenv_1.default.config();
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "mssql",
        host: process.env.DB_SERVER,
        database: "ScoreCard",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        entities: [Employee_1.Employee, ClientDetail_1.ClientDetail, Project_1.Project],
        options: {
            readOnlyIntent: true,
        },
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
    app.use(express_1.default.json());
    app.use("/api/projects", projects_1.default);
    app.use("/api/clients", clients_1.default);
    app.use("/api/employees", employees_1.default);
    app.listen(process.env.PORT || 5000, () => console.log(`Server started at port ${process.env.PORT || 5000}.`));
};
main().catch((error) => console.log(error));
//# sourceMappingURL=index.js.map