// src/routes/userRoutes.ts

import { Router } from 'express';[
    
]
import UserController from './controllers/userController';
//import authController from './controllers/authController';
import authRegister from './middlewares/AuthMiddleware';
import StudentController from './controllers/studentController';
import Container from './containers/container';
import MessageController from './controllers/messageController';

const router = Router();

// Obter instância do Controller do container
const userController = Container.get(UserController); 
const studentController = Container.get(StudentController)
const messageController = Container.get(MessageController)
// //login
// router.post('/getToken', authController.getToken);
// router.post('/register', authRegister, authController.createUser);
// router.post('/login', authController.login);
// router.post('/logout', authController.logout);

// Users
router.post('/createUser', (req, res) => userController.createUser(req, res));
router.get('/listUsers', (req, res) => userController.getUsers(req, res));
router.get('/getUser', (req, res) => userController.getUserById(req, res));
router.delete('/deleteUser', (req, res) => userController.deleteUser(req, res));
router.put('/updateUser', (req, res) => userController.updateUser(req, res));

// Students
router.post('/createStudent', (req, res) => studentController.createStudent(req, res));
router.get('/listStudents', (req, res) => studentController.getStudents(req, res));
router.get('/getStudent', (req, res) => studentController.getStudentById(req, res));
router.put('/updateStudent', (req, res) => studentController.updateStudent(req, res));
router.delete('/deleteStudent', (req, res) => studentController.deleteStudent(req, res));

// Messages
router.post('/createMessage', (req, res) => messageController.createMessage(req, res));
router.get('/getMessage', (req, res) => messageController.getMessageById(req, res));
router.put('/updateMessage', (req, res) => messageController.updateMessage(req, res));
router.delete('/deleteMessage', (req, res) => messageController.deleteMessage(req, res));

export default router;
