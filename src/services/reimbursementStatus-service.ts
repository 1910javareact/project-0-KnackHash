import { ReimbursementStatus } from '../models/reimbursementStatus';
import { daoGetReimbursementStatusById, daoGetReimbursementStatusByUser } from '../repositories/reimbursementStatus-dao';

export function getReimbursementStatusById(statusId: number): ReimbursementStatus {
    console.log('Service: you are searching for Reimbursement Status ' + statusId);
    return daoGetReimbursementStatusById(statusId);
}

export function getReimbursementStatusByUser(userId: number): ReimbursementStatus {
    console.log('Service: you are searching for Reimbursement Status' + userId);
    return daoGetReimbursementStatusByUser(userId);
}