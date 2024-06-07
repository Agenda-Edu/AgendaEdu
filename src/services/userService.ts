import { User } from "@prisma/client";
import userRepository from "../repositories/userRepository";
import { User as IUser } from '../interfaces/User';

class UserService {
  async createUser(user: IUser): Promise<User | string> {
    return userRepository.createUser(user);
  }
}
export default new UserService();
