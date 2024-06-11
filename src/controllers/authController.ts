import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt');
import 'dotenv/config';
import jwt, { sign } from 'jsonwebtoken';
import { IUser } from "../interfaces/IUser";
import authService from "../services/authService";

const SECRET = process.env.SECRET_KEY
class AuthController {
    async getToken(req: Request, res: Response) {

        const user: IUser = req.body;
        const { email, cpf, password } = user

        if (!SECRET || typeof SECRET !== "string") {
            throw new Error("Necessário passar a chave de segurança")
        }

        const token = jwt.sign({ email, cpf, password }, SECRET, { expiresIn: '1h' });

        res.json({ token });
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;

            if (!user.name || !user.password || !user.cpf) {
                return res.status(400).send('Nome de usuário, senha e cpf são necessários.');
            }
            const newUser = await authService.createUser(user);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async login(req: Request, res: Response) {

        const { email, password } = req.body;

        const user = await authService.validateUser(email)

        if (!user) {
            return res.json({ error: "Usuário não encontrado" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ error: "Senha incorreta" });
        }

        const token = sign({ id: user.id, nome: user.name, email: user.email, role: user.role }, "secret", { expiresIn: "1h" });

        return res.json({ user, token })

    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("jsonwebtoken");
            res.clearCookie("refreshtoken");
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

}

export default new AuthController();