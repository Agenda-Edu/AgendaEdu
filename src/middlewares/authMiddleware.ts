import 'dotenv/config';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY

export default function authRegister(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!SECRET || typeof SECRET !== "string") {
        throw new Error("Necessário passar a chave de segurança")
    }

    jwt.verify(token as string, SECRET, (err: any | string, decoded: any) => {
        if (err) {
            return res.status(401).json({ err: "É necessário passar um token" });
        }
        next();
    });
}