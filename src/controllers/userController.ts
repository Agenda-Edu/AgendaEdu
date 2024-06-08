import { Request, Response } from 'express';
import { User as IUser } from '../interfaces/User';
import userService from '../services/userService';
class UserController {
    async createUser(req: Request, res: Response) {
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

    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }

    async getUserById(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const user = await userService.getUserById(id);

            if (!user) return res
                .status(404)
                .json({ success: false, message: "⚠️ Usuário não encontrado" })

            res.json({
                success: true,
                result: user
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: " Internal Server Error" })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.query.id as string;
            const message = await userService.deleteUser(id);
            return res.status(200).json({ message });
        } catch (error) {
            return res.status(500).json({ success: false, message: " Internal Server Error" });
        }
    }
}
export default new UserController();
