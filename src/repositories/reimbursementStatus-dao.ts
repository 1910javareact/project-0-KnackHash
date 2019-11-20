import { ReimbursementStatus } from "../models/reimbursementStatus"
import { reimbursementstatus } from "../database"

export function daoGetReimbursementStatusById(id:number):ReimbursementStatus{
    for(let r of reimbursementstatus){
        if(r.userId === id){
            return r
        }
    }
    throw {
        status:404,
        message:'this reimbursement does not exist'
    }
}