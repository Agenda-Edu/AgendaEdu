import userRepository from "../repositories/userRepository";
import { User as IUser } from '../interfaces/User';

class UserService {
    async createUser(user: IUser) {
        return userRepository.createUser(user);
    }

    async getUsers() {
        return userRepository.getUsers();
    }

    async getUserById(id: string) {
        return userRepository.getUserById(id);
    }

    async updateUser(user: IUser) {
        return userRepository.updateUser(user);
    }

    async deleteUser(id: string) {
        return userRepository.deleteUser(id);
    }

}
export default new UserService();
