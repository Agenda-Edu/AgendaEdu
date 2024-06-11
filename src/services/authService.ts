import { IUser } from "../interfaces/IUser";
import userService from "./userService";

class AuthService {
    async createUser(userData: IUser): Promise<IUser> {
        try {
            const createdUser = await userService.createUser(userData);
            return createdUser;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async validateUser(email: string) {
        try {
            const validatedUser = await userService.getUserByEmail(email);
            return validatedUser;
        } catch (error) {
            console.error("User not found:", error);
            throw error;
        }
    }
}
export default new AuthService();