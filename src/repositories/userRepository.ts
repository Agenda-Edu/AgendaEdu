import { PrismaClient, User } from '@prisma/client';
import { User as IUser } from '../interfaces/User';

const prisma = new PrismaClient();

class UserRepository {
    async createUser(data: IUser): Promise<User> {
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
        return user;
    }
}
export default new UserRepository();
