import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetAllUsers } from '../repositories/user-dao';

export function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return daoGetUserByUsernameAndPassword(username, password);
}

export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e;
    }

}