import { PrismaClient } from '@prisma/client';
import { User as IUser, Adress as IAdress } from "../interfaces/User";

const prisma = new PrismaClient();

class UserRepository {
    async createUser(data: IUser): Promise<IUser> {
        const user = await prisma.user.create({
            data: {
                nome: data.nome,
                email: data.email,
                tipo: data.tipo,
                idEstudante: data.idEstudante,
                cpf: data.cpf,
                telefone1: data.telefone1,
                telefone2: data.telefone2,
                telefone3: data.telefone3,
                dataNascimento: data.dataNascimento,
                endereco: data.endereco ? {
                    create: {
                        logradouro: data.endereco.logradouro,
                        complemento: data.endereco.complemento,
                        numero: data.endereco.numero,
                        cep: data.endereco.cep
                    }
                } : undefined
            }
        });
        return user as IUser;
    }

    async getUsers(): Promise<IUser[]> {
        const users = await prisma.user.findMany({
            include: {
                endereco: true,
            },
        });

        const userObjects: IUser[] = users.map(user => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            idEstudante: user.idEstudante ?? undefined,
            cpf: user.cpf,
            telefone1: user.telefone1,
            telefone2: user.telefone2 ?? undefined,
            telefone3: user.telefone3 ?? undefined,
            dataNascimento: user.dataNascimento,
            endereco: user.endereco ? {
                logradouro: user.endereco.logradouro,
                complemento: user.endereco.complemento,
                numero: user.endereco.numero,
                cep: user.endereco.cep,
                userId: user.endereco.userId,
            } : undefined,
        }));

        return userObjects;
    }

    async getUsersById(id: string): Promise<IUser> {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                endereco: true,
            }
        });
        return user as IUser;
    }

    async deleteUser(id: string) {
        
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                endereco: true,
            }
        });

        console.log(user)

        // await prisma.user.delete({
        //     where: {
        //         id: id
        //     }
        // });

    }
}



export default new UserRepository();
