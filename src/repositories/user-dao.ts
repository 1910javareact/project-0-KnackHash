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

export function daoGetUserByUsernameAndPassword(username:string, password:string){
    for(let u of users){
        if(u.username === username && u.password === password){
            return u
        }
    }
    throw {
        status: 401,
        message: 'Bad credentials'
    }
}