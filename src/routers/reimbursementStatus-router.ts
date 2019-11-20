import { authorization } from "../middleware/auth-middleware"
import { getReimbursementStatusById } from "../services/reimbursementStatus-service"
import express from 'express'

export const ReimbursementStatusRouter = express.Router()

ReimbursementStatusRouter.get('/:id', [ authorization(['Admin', 'Finance-Manager']), (req,res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let reimbursementstatus = getReimbursementStatusById(id)
            res.json(reimbursementstatus)
        }catch(e){
            res.status(e.status).send(e.message)
        }
        
    }
}])