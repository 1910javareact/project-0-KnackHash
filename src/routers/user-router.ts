import User from '../models/user'
import { users } from "../database"
import { getAllUsers, saveOneUser } from '../services/user-service'

function controllerGetUsers(req, res){
    let users = getAllUsers()
    if(users){       
        res.json(users)
    }else{
        res.sendStatus(500)
    }
}

userRouter.get('', controllerGetUsers)

userRouter.post('', (req,res)=>{
    let {body} = req
    let newU = new User('',0,0)
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
})