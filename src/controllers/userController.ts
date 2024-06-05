import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import UserService from "../services/userService";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const { name, email } = req.body;

            if (!name || !email) {
                res.status(400).json({
                    success: false,
                    message: "⚠️ Preencha todos os campos necessários para criação de um usuário"
                });
                return;
            }

            const user: string | User = await this.userService.createUser({
                name,
                email
            } as User);

            if (typeof user === 'string') {
                res.status(500).json({ success: false, message: user });
                return;
            }

            res.json({
                success: true,
                message: "Usuário criado com sucesso",
                result: user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default new UserController(); 
