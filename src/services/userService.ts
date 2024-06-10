import userRepository from "../repositories/userRepository";
import { User as IUser } from '../interfaces/User';

class UserService {
    async createUser(user: IUser) {
        try {
            const createdUser = await userRepository.createUser(user)
            return createdUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await userRepository.getUsers()
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getUserById(id: string) {
        try {
            const user = await userRepository.getUserById(id);
            return user
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateUser(user: IUser) {
        try {
            const updatedUser = await userRepository.updateUser(user)
            return updatedUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteUser(id: string) {
        try {
            const deletedUser = await userRepository.deleteUser(id)
            return deletedUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

}
export default new UserService();
