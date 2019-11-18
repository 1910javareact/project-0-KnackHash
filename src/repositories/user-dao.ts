import { User } from "../models/user"
import { users } from "../database"

let id = 1


export function daoGetAllUsers():User[]{
    return users
}

export function daoSaveOneUser(u:User){
    g.id = id
    id++
    users.push(u)
    return true
}