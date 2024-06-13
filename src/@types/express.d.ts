import { IUser } from '../interfaces/Iuser';

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}