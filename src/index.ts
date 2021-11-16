import express from "express";
import cors from "cors";
import projectsRoute from "./routes/projects";
import clientsRoute from "./routes/clients";

const main = async () => {
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use("/api/projects", projectsRoute);
  app.use("api/clients", clientsRoute);
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started at port ${process.env.PORT || 5000}.`)
  );
};

main().catch((error) => console.log(error));
