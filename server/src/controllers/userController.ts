// UserController.ts
import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { User, userManager } from "../Maganers/UserManager";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export class UserController {
  // used to hash the password;
  private static hashPassword(password: string): string {
    const saltRound = 10;
    return bcryptjs.hashSync(password, saltRound);
  }

  // used to sign up the user
  public static signUp(
    req: Request<any, any, User>,
    res: Response<string>
  ): void {
    try {
      const { emailId, password, name } = req.body;
      const foundUser = userManager.findUser(emailId);
      //if user already present in the database
      if (foundUser) {
        res.status(409).send("User already present");
        return;
      }
      
      const hashedPassword = UserController.hashPassword(password);
      const newUser: User = {
        emailId,
        password: hashedPassword,
        name,
        tasks: [],
        userId: randomUUID(),
      };
      userManager.addUser(newUser);
      res.status(200).send("User signed up successfully");
    } catch (err) {
      console.log(err, "err");
    }
  }

  //used for sign in user
  static signIn(req: Request<any, any, User>, res: Response): void {
    const { emailId, password } = req.body;

    const foundUser = userManager.findUser(emailId);
    //if user not found in the database
    if (!foundUser) {
      res.status(404).send("User not found");
      return;
    }
    const isPasswordMatched = bcryptjs.compareSync(
      password,
      foundUser.password
    );
    const isUserValid = foundUser && isPasswordMatched;

    if (isUserValid) {
      const token = jwt.sign({ emailId: foundUser.emailId }, "sad2023", {
        expiresIn: "30m",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid password");
    }
  }
}
