import { User } from "@prisma/client";
import UserRepository from "../repositories/userRepository";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: User): Promise<User | string> {
        
        return this.userRepository.createUser(user);
    }
}

export default UserService;

