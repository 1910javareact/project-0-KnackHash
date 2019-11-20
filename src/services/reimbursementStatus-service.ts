import { ReimbursementStatus } from "../models/reimbursementStatus";
import { daoGetReimbursementStatusById } from "../repositories/reimbursementStatus-dao";

export function getReimbursementStatusById(id:number):ReimbursementStatus{
    console.log("Service: you are searching for Reimbursement Status " + id);
    return daoGetReimbursementStatusById(id)
}