import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/User';
import { registerUser } from '../services/authService';

const SECRET_KEY = process.env.SECRET_KEY;

export const createUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Lógica para criar um novo usuário e salvá-lo no banco de dados
        const newUser : User = req.body;

        await registerUser(newUser);

        // Gerar token JWT
        if (!SECRET_KEY || typeof SECRET_KEY !== 'string') {
            throw new Error("Chave não encontrada");
        }
        const token = jwt.sign({ userId: newUser.id }, SECRET_KEY);

        res.json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};