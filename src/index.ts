import express, { Request } from "express";

import bodyParser from "body-parser";
import { TaskManager } from "./Maganers/TaskManager";

import authRouter from "./routes/authRoute";
import taskRouter from "./routes/taskRoute";
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("Server started");
});
