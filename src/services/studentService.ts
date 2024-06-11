import StudentRepository from "../repositories/studentRepository";
import { IStudent as IStudent } from '../interfaces/IStudent';
import { Student } from "@prisma/client";

class StudentService {
    async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<Student> {
        try {
            const student = await StudentRepository.createStudent(userId, studentData);
            return student;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getStudents() {
        try {
            const student = await StudentRepository.getStudents();
            return student;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getStudentById(id: string) {
        try {
            const student = await StudentRepository.getStudentById(id);
            return student
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateStudent(student : IStudent) {
        try {
            const updatedStudent = await StudentRepository.updateStudent(student);
            return updatedStudent;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteStudent(id: string) {
        try {
            const student = await StudentRepository.deleteStudent(id);
            return student
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}
export default new StudentService();
