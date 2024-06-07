// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { User as IUser } from '../interfaces/User';
import userService from '../services/userService';

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData: IUser = req.body;
      const user = await userService.createUser(userData);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }
}
export default new UserController();
