// src/controllers/userController.ts

import { Request, Response } from 'express';
import userService from '../services/userService';
import { User as IUser } from "../interfaces/User";

class UserController {

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userData = req.body;
            const user = await userService.createUser(userData);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userData: IUser = req.body;
            const user = await userService.updateUser(userData);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const message = await userService.deleteUser(id);
            return res.status(200).json({ message });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }

    }
}

export default new UserController();
