import { Request, Response } from 'express';
import { IStudent } from '../interfaces/IStudent';
import { Service, Inject } from 'typedi';
import StudentService from '../services/studentService';

@Service()
class StudentController {

    constructor(@Inject(() => StudentService) private studentService: StudentService) {}

    async createStudent(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            const studentData: IStudent = req.body;
            const student = await this.studentService.createStudent(String(id), studentData);
            return res.status(201).json(student);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getStudents(req: Request, res: Response): Promise<void> {
        try {
            const students = await this.studentService.getStudents();
            res.json(students);
        } catch (error) {
            console.error("Erro ao obter estudantes:", error);
            res.status(500).send("Erro ao obter estudantes");
        }
    }

    async getStudentById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const student = await this.studentService.getStudentById(id);
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
            const students = await this.studentService.updateStudent(studentData);
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
            const student = await this.studentService.deleteStudent(id);
            if (!student) {
                return res.status(404).json({ error: 'student not found' });
            }
            return res.status(200).json(student);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}
export default StudentController;
