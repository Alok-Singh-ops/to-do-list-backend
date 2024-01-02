import { Request, Response } from "express";
import { Task } from "../Maganers/TaskManager";
import { userManager } from "../Maganers/UserManager";
import { randomUUID } from "crypto";

type RequestBody = {
  emailId: string;
  taskName: string;
  taskId: string;
};

export class TaskController {
  /**
   *
   * @param req emailId and taskName
   * @param res if user is present it will add to the store
   */
  public static addTask(req: Request<any, any, RequestBody>, res: Response) {
    const { emailId, taskName } = req.body;
    const task: Task = {
      taskId: randomUUID(),
      taskName,
      isCompleted: false,
    };
    const foundUser = userManager.findUser(emailId);
    if (foundUser) {
      res.status(200).send("Task added successfully");
    } else {
      res.status(404).send("Task not added");
    }
    foundUser.tasks.push(task);
  }

  /**
   * getTask
   */
  public static getTask(req: Request, res: Response) {
    const { emailId } = req.query;
    const foundUser = userManager.findUser(emailId);
    if (foundUser) {
      res.status(200).send(foundUser.tasks);
    } else {
      res.status(404).send("Can not get task");
    }
  }
}
