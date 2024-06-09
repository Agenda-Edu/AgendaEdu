import { PrismaClient, User } from '@prisma/client';
import { User as IUser } from "../interfaces/User";

const prisma = new PrismaClient();

class UserRepository {
    async createUser(data: IUser): Promise<IUser> {
        const user = await prisma.user.create({
            data: {
                nome: data.nome,
                email: data.email,
                tipo: data.tipo,
                student: data.students ? {
                    create: data.students.map(student => ({
                        id: student.id,
                        name: student.name,
                        class: student.class,
                        guardianIds: student.guardianIds,
                    })),
                } : undefined,
                cpf: data.cpf,
                telefone1: data.telefone1,
                telefone2: data.telefone2,
                telefone3: data.telefone3,
                dataNascimento: data.dataNascimento,
                adress: data.adress ? {
                    create: {
                        logradouro: data.adress.logradouro,
                        complemento: data.adress.complemento,
                        numero: data.adress.numero,
                        cep: data.adress.cep,
                    },
                } : undefined,
            },
        });
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            students: data.students ? data.students.map(student => ({
                id: student.id,
                name: student.name,
                class: student.class,
                guardianIds: student.guardianIds,
            })) : undefined,
            cpf: user.cpf,
            telefone1: user.telefone1,
            telefone2: user.telefone2 ?? undefined,
            telefone3: user.telefone3 ?? undefined,
            dataNascimento: user.dataNascimento,
            adress: data.adress ? {
                logradouro: data.adress.logradouro,
                complemento: data.adress.complemento,
                numero: data.adress.numero,
                cep: data.adress.cep,
            } : undefined,
        } as IUser;
    }

    async getUsers(): Promise<IUser[]> {
        const users = await prisma.user.findMany({
            include: { adress: true, student: true },
        });

        return users.map(user => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            students: user.student ? user.student.map(student => ({
                id: student.id,
                name: student.name,
                class: student.class,
                guardianIds: student.guardianIds,
            })) : [],
            cpf: user.cpf,
            telefone1: user.telefone1,
            telefone2: user.telefone2 ?? undefined,
            telefone3: user.telefone3 ?? undefined,
            dataNascimento: user.dataNascimento,
            adress: user.adress ? {
                logradouro: user.adress.logradouro,
                complemento: user.adress.complemento,
                numero: user.adress.numero,
                cep: user.adress.cep,
            } : undefined,
        }));
    }

    async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
            include: { adress: true, student: true },
        });
    }

    async updateUser(data: IUser): Promise<User | null> {
        const existingUser = await prisma.user.findUnique({
            where: { id: data.id },
            include: { adress: true, student: true },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        await prisma.user.update({
            where: { id: data.id },
            data: {
                nome: data.nome || existingUser.nome,
                email: data.email || existingUser.email,
                tipo: data.tipo || existingUser.tipo,
                cpf: data.cpf || existingUser.cpf,
                telefone1: data.telefone1 || existingUser.telefone1,
                telefone2: data.telefone2 || existingUser.telefone2,
                telefone3: data.telefone3 || existingUser.telefone3,
                dataNascimento: data.dataNascimento || existingUser.dataNascimento,
                adress: data.adress ? {
                    update: {
                        logradouro: data.adress.logradouro || existingUser.adress?.logradouro,
                        complemento: data.adress.complemento || existingUser.adress?.complemento,
                        numero: data.adress.numero || existingUser.adress?.numero,
                        cep: data.adress.cep || existingUser.adress?.cep,
                    },
                } : undefined,
                student: data.students ? {
                    deleteMany: {}, // Remove todos os estudantes atuais
                    create: data.students.map(student => ({
                        id: student.id,
                        name: student.name,
                        class: student.class,
                        guardianIds: student.guardianIds,
                    })),
                } : undefined,
            },
        });

        return await prisma.user.findUnique({
            where: { id: data.id },
            include: { adress: true, student: true },
        });
    }

    async deleteUser(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { adress: true, student: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        if (user.adress) {
            await prisma.adress.delete({
                where: { id: user.adress.id },
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
