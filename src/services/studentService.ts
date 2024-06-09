import StudentRepository from "../repositories/studentRepository";
import { Student as IStudent } from '../interfaces/Student';
import { Student } from "@prisma/client";

class StudentService {
    async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>): Promise<Student> {
        console.log("Service")

        try {
            const student = await StudentRepository.createStudent(userId, studentData);
            console.log("Service Student: ", student);
            return student;
        } catch (error) {
            console.error("Service Error: ", error);
            throw error;
        }

    }
}
export default new StudentService();
