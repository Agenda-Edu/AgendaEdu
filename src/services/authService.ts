
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User as IUser } from '../interfaces/User';
import userService from './userService';

const SECRET_KEY = process.env.SECRET_KEY; 

export const registerUser = async (userData: IUser): Promise<IUser> => {

    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = await userService.createUser(userData);
    return newUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    if(!SECRET_KEY || typeof SECRET_KEY !== 'string') {
        throw new Error("Necessário fornecer uma chave secreta válida");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    return { token, user };
};