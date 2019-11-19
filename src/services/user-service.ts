import { User } from "../models/user"
import { daoGetAllUsers, daoSaveOneUser, daoGetUserByUsernameAndPassword } from "../repositories/user-dao"

export function getAllUsers():User[]{
    return daoGetAllUsers()
}

export function saveOneUser(u:User){
    return daoSaveOneUser(u)
}

export function getUserByUsernameAndPassword(username:string, password:string){
    return daoGetUserByUsernameAndPassword(username, password)
}