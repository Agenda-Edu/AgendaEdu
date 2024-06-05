import { Request, Response, Router } from "express";
import UserController from './controllers/userController';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json("🚀 Aplicação iniciada com sucesso!");
})

router.post('/createUser', UserController.createUser)

export default router;