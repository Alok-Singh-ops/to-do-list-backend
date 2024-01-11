import express from "express";
import { TaskController } from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";
const taskRouter = express.Router();

taskRouter.post("/addTask", authenticate, TaskController.addTask);
taskRouter.get("/getTask", authenticate, TaskController.getTask);
taskRouter.delete("/deleteTask", authenticate, TaskController.deleteTask);

export default taskRouter;
