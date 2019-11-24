import { Reimbursement } from '../models/reimbursement';

export async function buildReimbursement(reimbursementJson): Promise<Reimbursement>{
    return {
        reimbursementId: reimbursementJson.reimbursementid,
        author: reimbursementJson.author,
        amount: reimbursementJson.amount,
        dateSubmitted: reimbursementJson.datesubmitted,
        dateResolved: reimbursementJson.dateresolved,
        description: reimbursementJson.description,
        resolver: reimbursementJson.resolver,
        status: reimbursementJson.statusid,
        type: reimbursementJson.typeid
    };

}