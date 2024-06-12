

import { Student } from '@prisma/client';
import { prisma } from '../databse/db';
import { IStudent as IStudent } from '../interfaces/IStudent';
import { Service } from 'typedi';

@Service()
class StudentRepository {

    async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>) {

        const user = await prisma.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const student = await prisma.student.create({
            data: {
                ...studentData,
                userId: userId,
            },
        });

        return student;
    }

    async getStudents(): Promise<IStudent[]> {
        const students = await prisma.student.findMany();
        return students;
    }

    async getStudentById(id: string): Promise<IStudent> {
        const student = await prisma.student.findFirst({
            where: { id: id}
        });
        return student as IStudent;
    }

    async updateStudent(student: IStudent) {
        const existStudent = await prisma.student.findFirst({
            where: { id: student.id }
        })

        if (!existStudent) {
            throw new Error('User not found');
        }

        const updatedStudent = await prisma.student.update({
            where: { id: student.id },
            data: {
                name: student.name || existStudent.name,
                cpf: student.cpf ?? existStudent.cpf,
                class: student.class || existStudent.class,
                turn: student.turn || existStudent.turn,
                brithDay: student.brithDay || existStudent.brithDay,
            }
        })

        return updatedStudent;
    }

    async deleteStudent(id: string): Promise<Student> {
        const student = await prisma.student.findUnique({
            where: { id },
        });

        if (!student) {
            throw new Error("student not found");
        }

        await prisma.student.delete({
            where: { id },
        });

        return student;
    }
}
export default StudentRepository;