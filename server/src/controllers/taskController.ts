import { Request, Response } from "express";
import { Task, TaskManager } from "../Maganers/TaskManager";
import { userManager } from "../Maganers/UserManager";
import { randomUUID } from "crypto";
import redisClient from "../redis";
import jwt, { JwtPayload } from "jsonwebtoken";

type RequestBody = {
  emailId: string;
  taskName: string;
  taskId: string;
};

export class TaskController {
  public static addTask(req: Request<any, any, RequestBody>, res: Response) {
    try {
      const header = req.header("Authorization");
      const decoded = jwt.verify(header, "sad2023") as JwtPayload;
      const emailId = decoded.emailId;

      const { taskName } = req.body;
      const task: Task = {
        taskId: randomUUID(),
        taskName,
        isCompleted: false,
      };

      const foundUser = userManager.findUser(emailId);
      if (foundUser) {
        foundUser.tasks.push(task);

        // Update the user data in Redis
        redisClient.set(
          emailId,
          JSON.stringify(foundUser.tasks),
          (err, reply) => {
            if (err) {
              console.error("Error updating Redis cache:", err);
              res.status(500).send("Internal Server Error");
            } else {
              res.status(200).send("Task added successfully");
            }
          }
        );
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  public static async getTask(req: Request, res: Response) {
    try {
      const header = req.header("Authorization");
      const decoded = jwt.verify(header, "sad2023") as JwtPayload;
      const emailId = decoded.emailId;
      const userInRedis = await redisClient.get(emailId);

      if (userInRedis) {
        res.status(200).json(JSON.parse(userInRedis));
      } else {
        setTimeout(async () => {
          const foundUser = userManager.findUser(emailId);
          await redisClient.set(emailId, JSON.stringify(foundUser.tasks));
          res.status(200).json(foundUser.tasks);
        }, 4000);
      }
    } catch (error) {
      console.error("Error getting tasks:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  public static deleteTask(req: Request<any, any, any>, res: Response) {
    try {
      const { taskId } = req.body;
      const taskManager = new TaskManager();
      const header = req.header("Authorization");
      const decoded = jwt.verify(header, "sad2023") as JwtPayload;
      const emailId = decoded.emailId;
      const task = taskManager.deleteTask(taskId, emailId);

      // Update the user data in Redis after deleting the task
      const foundUser = userManager.findUser(emailId);
      if (foundUser) {
        redisClient.set(
          emailId,
          JSON.stringify(foundUser.tasks),
          (err, reply) => {
            if (err) {
              console.error("Error updating Redis cache:", err);
              res.status(500).send("Internal Server Error");
            } else {
              res.status(200).json(task);
            }
          }
        );
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}
