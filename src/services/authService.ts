import { Inject, Service } from "typedi";
import { IUser } from "../interfaces/IUser";
import UserService from "./userService";

@Service()
class AuthService {

    constructor(@Inject(() => UserService) private userService: UserService) {}

    async createUser(userData: IUser): Promise<IUser> {
        try {
            const createdUser = await this.userService.createUser(userData);
            return createdUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async validateUser(email: string) {
        try {
            const validatedUser = await this.userService.getUserByEmail(email);
            return validatedUser;
        } catch (error) {
            console.error("User not found:", error);
            throw error;
        }
    }
}
export default AuthService;