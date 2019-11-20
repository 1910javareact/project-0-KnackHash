import {User} from '../models/user'
import { getAllUsers, saveOneUser, getUserById } from '../services/user-service'
import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { Role } from '../models/role'

export const userRouter = express.Router()

function controllerGetUsers(req, res){
    let users = getAllUsers()
    if(users){       
        res.json(users)
    }else{
        res.sendStatus(500)
    }
}

userRouter.get('', [ authorization(['Admin']), controllerGetUsers])

userRouter.post('', [ authorization(['Admin']),(req,res)=>{
    let {body} = req
    let newU = new User(0,"","","","","",new Role(0, ""))
    for(let key in newU){
        console.log(body[key]);
        if(body[key] === undefined){
            res.status(400).send('Please include all user fields')
            break;
        }else{
            newU[key] = body[key]
        }
    }
    if(saveOneUser(newU)){
        res.sendStatus(201)
    }else {
        res.sendStatus(500)
    }
}])

userRouter.get('/:id', [ authorization(['Admin']), (req,res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let garden = getUserById(id)
            res.json(garden)
        }catch(e){
            res.status(e.status).send(e.message)
        }
        
    }
}])