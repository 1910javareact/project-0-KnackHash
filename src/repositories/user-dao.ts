import { User } from "../models/user"
import { users } from "../database"

let userId = 1


export function daoGetAllUsers():User[]{
    return users
}

export function daoSaveOneUser(u:User){
    u.userId = userId
    userId++
    users.push(u)
    return true
}