import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import Container from 'typedi';
import AuthService from '../services/authService';


const authService = Container.get(AuthService)
const validateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        const user = await authService.validateUser(email);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        req.user = user ;

        next();
    } catch (error) {
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export default validateUserMiddleware;
