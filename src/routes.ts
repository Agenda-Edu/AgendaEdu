// src/routes.ts

import { Router } from "./utils/Router";
import express, { Request, Response } from 'express';
import Container from "typedi";
import UserController from "./controllers/UserController";
import StudentController from "./controllers/StudentController";
import MessageController from "./controllers/MessageController";
import AuthController from "./controllers/AuthController";
import 'dotenv/config';

const app = express();

const userController = Container.get(UserController);
const studentController = Container.get(StudentController);
const messageController = Container.get(MessageController);

const baseRoute = process.env.BASE_ROUT_DEV;

console.log('Router called');
new Router(app, baseRoute)

    .get('/health-status', (req: Request, res: Response) => {
        res.send({ "message": "API Agenda-Edu está online " });
    })

    //.post('/getToken', AuthController.authenticate)
    // .post('/register', AuthController.register)
    .post('/login', AuthController.authenticate)
    // .post('/logout', AuthController.logout)

    .post('/createUser', (req: Request, res: Response) => userController.createUser(req, res))
    .get('/listUsers', (req: Request, res: Response) => userController.getUsers(req, res))
    .get('/getUser', (req: Request, res: Response) => userController.getUserById(req, res))
    .delete('/deleteUser', (req: Request, res: Response) => userController.deleteUser(req, res))
    .put('/updateUser', (req: Request, res: Response) => userController.updateUser(req, res))

    .post('/createStudent', (req: Request, res: Response) => studentController.createStudent(req, res))
    .get('/listStudents', (req: Request, res: Response) => studentController.getStudents(req, res))
    .get('/getStudent', (req: Request, res: Response) => studentController.getStudentById(req, res))
    .put('/updateStudent', (req: Request, res: Response) => studentController.updateStudent(req, res))
    .delete('/deleteStudent', (req: Request, res: Response) => studentController.deleteStudent(req, res))

    .post('/createMessage', (req: Request, res: Response) => messageController.createMessage(req, res))
    .get('/getMessage', (req: Request, res: Response) => messageController.getMessageById(req, res))
    .put('/updateMessage', (req: Request, res: Response) => messageController.updateMessage(req, res))
    .delete('/deleteMessage', (req: Request, res: Response) => messageController.deleteMessage(req, res));

export default app;
