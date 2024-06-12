import StudentRepository from "../repositories/studentRepository";
import { IStudent } from '../interfaces/IStudent';
import { Student } from "@prisma/client";
import { Inject, Service } from 'typedi';
@Service()
class StudentService {

    constructor(@Inject(() => StudentRepository) private studentRepository: StudentRepository) {}

    async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<Student> {
        try {
            const student = await this.studentRepository.createStudent(userId, studentData);
            return student;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getStudents(): Promise<IStudent[]> {
        try {
            const student = await this.studentRepository.getStudents();
            return student;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getStudentById(id: string) {
        try {
            const student = await this.studentRepository.getStudentById(id);
            return student
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateStudent(student : IStudent) {
        try {
            const updatedStudent = await this.studentRepository.updateStudent(student);
            return updatedStudent;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteStudent(id: string) {
        try {
            const student = await this.studentRepository.deleteStudent(id);
            return student
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}
export default StudentService;
