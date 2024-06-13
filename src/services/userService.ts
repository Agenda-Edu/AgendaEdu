
import { Inject, Service } from 'typedi';
import { IUserObject } from '../interfaces/IUserObject';
import UserRepository from '../repositories/UserRepository';

@Service()
class UserService {

    constructor(@Inject(() => UserRepository) private userRepository: UserRepository) {}

    async createUser(user: IUserObject) {
        try {
            const createdUser = await this.userRepository.createUser(user)
            return createdUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await this.userRepository.getUsers()
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.userRepository.getUserById(id);
            return user
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.getUserByEmail(email);;
            return user
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUserByCpf(cpf: string) {
        try {
            const user = await this.userRepository.getUserByCpf(cpf);;
            return user
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateUser(user: IUserObject) {
        try {
            const updatedUser = await this.userRepository.updateUser(user)
            return updatedUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const deletedUser = await this.userRepository.deleteUser(id)
            return deletedUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}

export default UserService;
