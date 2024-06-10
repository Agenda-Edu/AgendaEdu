

// // import { prisma } from '../databse/db';
// // import { Student as IStudent } from '../interfaces/Student';

// // class StudentRepository {

// //     async createStudent(userId: string, studentData: Omit<IStudent, 'id' | 'userId'>) {

// //         const user = await prisma.user.findFirst({
// //             where: { id: userId },
// //         });

// //         if (!user) {
// //             throw new Error('User not found');
// //         }

// //         const student = await prisma.student.create({
// //             data: {
// //                 ...studentData,
// //                 userId: userId,
// //             },
// //         });

// //         return student;
// //     }

// //     // async getStudents(): Promise<IStudent[]> {
// //     //     console.log("getStudent / try / Service / getStudents / Repository / getStudents")
// //     //     const students = await prisma.student.findMany();

// //     //     return students.map(student => (
// //     //         {
// //     //             id: student.id,
// //     //             name: student.name,
// //     //             cpf: student.cpf,
// //     //             class: student.class,
// //     //             turn: student.turn,
// //     //         }));
// //     // }
// // }
// // export default new StudentRepository();