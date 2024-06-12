import 'reflect-metadata';
import { Container } from 'typedi';
import UserController from "../controllers/userController";
import UserRepository from "../repositories/userRepository";
import UserService from "../services/userService";
import StudentRepository from '../repositories/studentRepository';
import StudentService from '../services/studentService';
import StudentController from '../controllers/studentController';

//user
Container.set(UserRepository, new UserRepository());
Container.set(UserService, new UserService(Container.get(UserRepository)));
Container.set(UserController, new UserController(Container.get(UserService)));

//Student
Container.set(StudentRepository, new StudentRepository());
Container.set(StudentService, new StudentService(Container.get(StudentRepository)));
Container.set(StudentController, new StudentController(Container.get(StudentService)));

//Message

export default Container;
