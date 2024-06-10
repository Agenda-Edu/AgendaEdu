import { PrismaClient, User } from '@prisma/client';
import { User as IUser } from "../interfaces/User";

const prisma = new PrismaClient();
class UserRepository {
    async createUser(data: IUser): Promise<IUser> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                student: data.students ? {
                    create: data.students.map(student => ({
                        id: student.id,
                        name: student.name,
                        cpf: student.cpf,
                        class: student.class,
                        turn: student.turn,
                        brithDay: student.brithDay
                    })),
                } : undefined,
                cpf: data.cpf,
                telefone1: data.telefone1,
                telefone2: data.telefone2,
                telefone3: data.telefone3,
                brithDay: data.brithDay,
                address: data.address ? {
                    create: {
                        address: data.address.address,
                        complement: data.address.complement,
                        number: data.address.number,
                        cep: data.address.cep,
                    },
                } : undefined,
            },
            include: { address: true, student: true }  // Inclui as relações no retorno
        });

        return user as IUser;
    }

    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany({ include: { address: true, student: true } });
        return users;
    }

    async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
            include: { address: true, student: true },
        });
    }

    async updateUser(data: IUser): Promise<User | null> {
        const existingUser = await prisma.user.findFirst({
            where: { id: data.id },
            include: { address: true, student: true },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        await prisma.user.update({
            where: { id: data.id },
            data: {
                name: data.name || existingUser.name,
                email: data.email || existingUser.email,
                role: data.role || existingUser.role,
                cpf: data.cpf || existingUser.cpf,
                telefone1: data.telefone1 || existingUser.telefone1,
                telefone2: data.telefone2 || existingUser.telefone2,
                telefone3: data.telefone3 || existingUser.telefone3,
                brithDay: data.brithDay || existingUser.brithDay,
                address: data.address ? {
                    update: {
                        address: data.address.address || existingUser.address?.address,
                        complement: data.address.complement || existingUser.address?.complement,
                        number: data.address.number || existingUser.address?.number,
                        cep: data.address.cep || existingUser.address?.cep,
                    },
                } : undefined,
                student: data.students ? {
                    deleteMany: {}, // Remove todos os estudantes atuais
                    create: data.students.map(student => ({
                        id: student.id,
                        name: student.name,
                        cpf: student.cpf,
                        class: student.class,
                        turn: student.turn,
                        brithDay: student.brithDay,
                    })),
                } : undefined,
            },
        });

        return await prisma.user.findUnique({
            where: { id: data.id },
            include: { address: true, student: true },
        });
    }

    async deleteUser(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { address: true, student: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        if (user.address) {
            await prisma.address.delete({
                where: { id: user.address.id },
            });
        }

        if (user.student && user.student.length > 0) {
            await prisma.student.deleteMany({
                where: { id: { in: user.student.map(student => student.id) } },
            });
        }

        await prisma.user.delete({
            where: { id },
        });

        return user;
    }
}
export default new UserRepository();
