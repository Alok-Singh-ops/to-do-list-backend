// user-manager.ts

import { Task } from "./TaskManager";

export interface User {
  userId: string;
  emailId: string;
  name: string;
  password: string;
  tasks: Task[];
}

class UserManager {
  private static instance: UserManager | null = null;
  private users: User[];
  private constructor() {
    this.users = [];
  }
  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  /**
   * @description prints the users store
   *
   */
  public printStore = (): void =>
    this.users.forEach((user) => console.log(user));
  /**
   * Checks if a user with the given email is present in the store.
   * @param user - The user to check for presence.
   * @returns True if the user is present, false otherwise.
   */
  public isUserPresent = (user: User): boolean =>
    this.users.some(({ emailId }) => emailId === user.emailId);
  /**
   * Finds a user by email.
   * @param emailId - The email ID of the user to find.
   * @returns The user object if found, otherwise null.
   */
  public findUser = (emailId: any): User | null =>
    this.users.find(({ emailId: userEmail }) => userEmail === emailId) || null;

  /**
   * Adds a user to the store.
   * @param user - The user to add.
   * @returns A message indicating the result of the operation.
   */
  public addUser = (user: User): string =>
    this.isUserPresent(user)
      ? "User is already present in the store"
      : (this.users.push(user), "User added to the database");
  findUserById(emailId: string): User | undefined {
    return this.users.find((user) => user.emailId === emailId);
  }
}

export const userManager = UserManager.getInstance();
