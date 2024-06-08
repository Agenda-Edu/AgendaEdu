import { Request, Response, Router } from "express";
import UserController from './controllers/userController';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json("🚀 Aplicação iniciada com sucesso!");
})
//Users
router.post('/createUser', UserController.createUser)
router.get('/listUsers', UserController.getUsers)
router.get('/getUser', UserController.getUserById)
router.delete('/deleteUser', UserController.deleteUser)



export default router;