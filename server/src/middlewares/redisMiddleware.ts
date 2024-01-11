import { Request, Response, NextFunction } from "express";
import redisClient from "../redis";

export async function getTaskRedisMiddleware(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const emailId = req.query.query as string;
    const userInRedis = await redisClient.get(emailId);
    console.log("log 1");
    if (userInRedis) {
      res.status(200).send("User found in Redis");
    } else {
      console.log("log 3");
      await redisClient.set(emailId, "hi from redis server");
      res.status(200).send("User not found in Redis, set in Redis");
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
  } finally {
    next();
  }
}
