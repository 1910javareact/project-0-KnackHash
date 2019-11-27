import { User } from '../models/user';
import { daoGetAllUsers, daoSaveOneUser, daoGetUserById, daoGetUserByUsernameAndPassword } from '../repositories/user-dao';

export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e;
    }
}

export function saveOneUser(u: User): Promise<User> {
    return daoSaveOneUser(u);
}

export function getUserById(userid: number): Promise<User> {
    console.log('Service: you are searching for user ' + userid);
    return daoGetUserById(userid);
}

export function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return daoGetUserByUsernameAndPassword(username, password);
}