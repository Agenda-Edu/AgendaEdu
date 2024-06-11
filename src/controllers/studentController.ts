
import { Request, Response } from 'express';
import studentService from '../services/studentService';
import { Student as IStudent } from '../interfaces/Student';

class StudentController {
    async createStudent(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query
            const studentData: IStudent = req.body;
            const student = await studentService.createStudent(String(id), studentData);
            return res.status(201).json(student);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getStudent(req: Request, res: Response) {
        try {
            const students = await studentService.getStudents();
            res.json(students);
        } catch (error) {
            console.error('Erro ao obter estudantes:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getStudentById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const student = await studentService.getStudentById(id);
            if (!student) {
                return res.status(404).json({ error: 'student not found' });
            }
            return res.status(200).json(student);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async updateStudent(req: Request, res: Response) {
        try {
            const studentData: IStudent = req.body;
            const students = await studentService.updateStudent(studentData);
            res.json(students);
        } catch (error) {
            console.error('Erro ao obter estudantes:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteStudent(req: Request, res: Response) {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const student = await studentService.deleteStudent(id);
            if (!student) {
                return res.status(404).json({ error: 'student not found' });
            }
            return res.status(200).json(student);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}
export default new StudentController();