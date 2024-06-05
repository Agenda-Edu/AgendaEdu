import { User } from "@prisma/client";
import { prisma } from "../databse/db";

class UserRepository {
    async createUser(user: User): Promise<User | string> {

        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email
            }
        });
    }
}

export default UserRepository;