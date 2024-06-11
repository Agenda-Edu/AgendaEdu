import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { IUser } from "../interfaces/IUser";

export default async function validatedUser(req: Request, res: Response, next: NextFunction) {

    const user: IUser = req.body;

    if (!user.email) {
        return res.status(400).json({ message: "Preencha o campo de e-mail" });
    }

    if (!user.cpf) {
        return res.status(400).json({ message: "Preencha o campo de CPF" });
    }

    try {
        // Verifica se o e-mail já existe
        const userByEmail = await userService.getUserByEmail(user.email);
        if (userByEmail) {
            return res.status(409).json({ message: `✖️ O e-mail já existe!` });
        }

        // Verifica se o CPF já existe
        const userByCpf = await userService.getUserByCpf(user.cpf);
        if (userByCpf) {
            return res.status(409).json({ message: `✖️ O CPF já existe!` });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Erro ao validar usuário", error });
    }
}