import { ReimbursementStatus } from '../models/reimbursementStatus';
import { reimbursementstatus } from '../database';

export function daoGetReimbursementStatusById(id: number): ReimbursementStatus {
    for (const r of reimbursementstatus) {
        if (r.userId === id) {
            return r;
        }
    }
    throw {
        status: 404,
        message: 'this reimbursement does not exist'
    };
}

export function daoGetReimbursementStatusByUser(user: number): ReimbursementStatus {
    for (const r of reimbursementstatus) {
        if (r.user === user) {
            return r;
        }
    }
    throw {
        status: 404,
        message: 'this user either does not exist or has no reimbursements'
    };
}