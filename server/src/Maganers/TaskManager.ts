// task-manager.ts

import { userManager } from "./UserManager";

export interface Task {
  taskId: string;
  taskName: string;
  isCompleted: boolean;
}

export class TaskManager {
  /**
   * Adds a task to a user's tasks.
   * @param task - The task to add.
   * @param emailId - The email ID of the user.
   * @returns A message indicating the result of the operation.
   */
  public addTask(task: Task, emailId: string): string {
    const foundUser = userManager.findUser(emailId);
    return foundUser
      ? (foundUser.tasks.push(task), "Task added to user's tasks")
      : "User not found";
  }
  /**
   * getTask
   */
  public getTask(emailId: string): Task[] {
    const foundUser = userManager.findUser(emailId);
    return foundUser.tasks;
  }

  private getTaskById(taskId: string, emailId: string): Task {
    const user = userManager.findUser(emailId);
    return user.tasks.find((task) => task.taskId === taskId);
  }

  public deleteTask(taskId: string, emailId: string) {
    const user = userManager.findUser(emailId);
    return user.tasks.filter((task) => task.taskId !== taskId);
  }
}
