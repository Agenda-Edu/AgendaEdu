
import { Request, Response } from 'express';
import studentService from '../services/studentService';
import { Student as IStudent } from '../interfaces/Student';

class StudentController {
    async createStudent(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query
            const userData : IStudent = req.body;       
            const student = await studentService.createStudent(String(id) ,userData);
            return res.status(201).json(student);
        } catch (error) {
            return res.status(400).json({ success: false, message: " Internal Server Error" });
        }
    }

    async getStudent(req: Request, res: Response) {
        console.log("getStudent")
        try {
            const students = await studentService.getStudents();
            res.json(students);
        } catch (error) {
            console.error('Erro ao obter estudantes:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
export default new StudentController();