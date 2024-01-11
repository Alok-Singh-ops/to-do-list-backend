import express from "express";

import bodyParser from "body-parser";

import authRouter from "./routes/authRoute";
import taskRouter from "./routes/taskRoute";
import cors from "cors";
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log("Server started");
});
