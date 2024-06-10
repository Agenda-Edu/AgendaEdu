

import { Student } from '@prisma/client';
import { prisma } from '../databse/db';
import { Student as IStudent } from '../interfaces/Student';

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

    async updateStudent(data: IStudent) {
        const student = await prisma.student.findFirst({
            where: { id: data.id }
        })

        if (!student) {
            throw new Error('User not found');
        }

        await prisma.student.update({
            where: { id: data.id },
            data: {
                name: data.name || student.name,
                cpf: data.cpf ?? student.cpf,
                class: data.class || student.class,
                turn: data.turn || student.turn,
                brithDay: data.brithDay || student.brithDay,
            }
        })

        return await prisma.student.findFirst({
            where: { id: data.id }
        })
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
export default new StudentRepository();