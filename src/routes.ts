// src/routes/userRoutes.ts

import { Router } from "express";
import UserController from '../src/controllers/userController';
import StudentController from '../src/controllers/studentController';
import messageController from "./controllers/messageController";
import authController from "./controllers/authController";
import auth from "./middlewares/AuthMiddleware";

const router = Router();

// //login
 router.post('/getToken',  authController.getToken);
 router.post('/register', auth, authController.createUser);

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
