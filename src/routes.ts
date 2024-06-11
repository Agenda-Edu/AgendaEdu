// src/routes/userRoutes.ts

import { Request, Response, Router } from "express";
import UserController from '../src/controllers/userController';
import StudentController from '../src/controllers/studentController';
import messageController from "./controllers/messageController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json("🚀 Aplicação iniciada com sucesso!");
});

// Users
router.post("/createUser", UserController.createUser);
router.get("/listUsers", UserController.getUsers);
router.get("/getUser", UserController.getUserById); 
router.delete("/deleteUser", UserController.deleteUser);
router.put("/updateUser", UserController.updateUser);

//Students
router.post("/createStudent", StudentController.createStudent);
router.get("/listStudents", StudentController.getStudent);
router.get("/getStudent", StudentController.getStudentById);
router.put("/updateStudent", StudentController.updateStudent);
router.delete("/deleteStudant", StudentController.deleteStudent);

//Messages
router.post("/createMessage", messageController.createMessage);
router.get("/getMessage", messageController.getMessageById);
router.put("/updateMessage", messageController.updateMessage);
router.delete("/deleteMessage", messageController.deleteMessage);

export default router;
