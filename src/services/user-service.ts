import { User } from "../models/user"
import { daoGetAllUsers, daoSaveOneUser } from "../repositories/user-dao"

export function getAllUsers():User[]{
    //do some processing
    return daoGetAllUsers()
}

export function saveOneUser(u:User){
    return daoSaveOneUser(u)
}