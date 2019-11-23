import { User } from '../models/user';
import { daoGetAllUsers, daoSaveOneUser, daoGetUserByUsernameAndPassword, daoGetUserById } from '../repositories/user-dao';

export function getAllUsers(): User[] {
    return daoGetAllUsers();
}

export function saveOneUser(u: User) {
    return daoSaveOneUser(u);
}

export function getUserById(id: number): User {
    console.log('Service: you are searching for user ' + id);
    return daoGetUserById(id);
}

export function getUserByUsernameAndPassword(username: string, password: string) {
    return daoGetUserByUsernameAndPassword(username, password);
}