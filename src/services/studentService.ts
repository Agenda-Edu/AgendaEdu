import StudentRepository from "../repositories/studentRepository";
import { Student as IStudent } from '../interfaces/Student';
import { Student } from "@prisma/client";

class StudentService {
    async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<Student> {
        const student = await StudentRepository.createStudent(userId, studentData);
        return student;
    }

    async getStudents() {
        console.log("getStudent / try / Service / getStudents")
        const student = await StudentRepository.getStudents();
        return student;
    }
}
export default new StudentService();
