import { Request, Response } from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/IUser";
import userService from "../services/userService";

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
        const user: IUser = req.body;

        if (!user.name || !user.password || !user.cpf) {
            return res.status(400).send('Nome de usuário, senha e cpf são necessários.');
        }

        const newUser = await userService.createUser(user);

        return res.status(201).send('Usuário criado com sucesso.');
    }

}

export default new AuthController();