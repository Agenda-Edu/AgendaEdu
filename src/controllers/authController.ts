import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { prisma } from "../databse/Db";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

@Service()
class AuthController {

    static async authenticate(req: Request, res: Response, next: NextFunction) {
        console.log('Authenticate called'); 
        
        const { email, password } = req.body;

        console.log(password)

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.json({ error: "Usuário não encontrado" });
        }
        
        const isValuePasssword = await compare(password, user.password);

        if (!isValuePasssword) {
            return res.json({ error: "Senha incorreta" });
        }

        const token = sign({ id: user.id, nome: user.name, email: user.email, role: user.role }, "secret", { expiresIn: "1h" });

        return res.json({ user, token });
    }
    
    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("jsonwebtoken");
            res.clearCookie("refreshtoken");
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
