import express from "express";
import cors from "cors";
import projectsRoute from "./routes/projects";
import clientsRoute from "./routes/clients";
import employeesRoute from "./routes/employees";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { Employee } from "./entities/Employee";
import { ClientDetail } from "./entities/ClientDetail";
import { Project } from "./entities/Project";

dotenv.config();

const main = async () => {
  await createConnection({
    type: "mssql",
    host: process.env.DB_SERVER,
    database: "ScoreCard",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    entities: [Employee, ClientDetail, Project],
    options: {
      readOnlyIntent: true,
    },
  });
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use("/api/projects", projectsRoute);
  app.use("/api/clients", clientsRoute);
  app.use("/api/employees", employeesRoute);
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started at port ${process.env.PORT || 5000}.`)
  );
};

main().catch((error) => console.log(error));
