import userRepository from "../repositories/userRepository";
import { User as IUser } from '../interfaces/User';

class UserService {
    async createUser(user: IUser) {
        try {
            const createdUser = await userRepository.createUser(user);
            console.log("Service Student: ", createdUser);
            return createdUser;
        } catch (error) {
            console.error("Service Error: ", error);
            throw error;
        }
    }

    async getUsers() {
        return userRepository.getUsers();
    }

    async getUserById(id: string){
        return userRepository.getUserById(id);
    }

    async updateUser(user: IUser){
        return userRepository.updateUser(user);
    }

    async deleteUser(id: string){
        return userRepository.deleteUser(id);
    }

}
export default new UserService();
