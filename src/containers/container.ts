//import 'reflect-metadata';
import { Container } from 'typedi';
import UserController from "../controllers/UserController";
import UserRepository from "../repositories/UserRepository";
import StudentRepository from '../repositories/StudentRepository';
import StudentService from '../services/StudentService';
import StudentController from '../controllers/StudentController';
import MessageRepository from '../repositories/MessageRepository';
import MessageService from '../services/MessageService';
import MessageController from '../controllers/MessageController';
import UserService from '../services/UserService';
import { Router } from '../utils/Router';

//user
Container.set(UserRepository, new UserRepository());
Container.set(UserService, new UserService(Container.get(UserRepository)));
Container.set(UserController, new UserController(Container.get(UserService)));

//Student
Container.set(StudentRepository, new StudentRepository());
Container.set(StudentService, new StudentService(Container.get(StudentRepository)));
Container.set(StudentController, new StudentController(Container.get(StudentService)));

//Message
Container.set(MessageRepository, new MessageRepository());
Container.set(MessageService, new MessageService(Container.get(MessageRepository)));
Container.set(MessageController, new MessageController(Container.get(MessageService)));


export default Container;
