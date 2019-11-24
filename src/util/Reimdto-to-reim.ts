import { Reimbursement } from '../models/reimbursement';
import { ReimDTO } from '../dtos/reim-dto';

// export async function buildReimbursement(reimbursementJson): Promise<Reimbursement> {
//     return {
//         reimbursementId: reimbursementJson.reimbursementid,
//         author: reimbursementJson.author,
//         amount: reimbursementJson.amount,
//         dateSubmitted: reimbursementJson.datesubmitted,
//         dateResolved: reimbursementJson.dateresolved,
//         description: reimbursementJson.description,
//         resolver: reimbursementJson.resolver,
//         status: reimbursementJson.statusid,
//         type: reimbursementJson.typeid
//     };

// }

export function buildReimbursement(rD: ReimDTO[]): Reimbursement {
    const reimbursement = [];
    for (const r of rD) {
        reimbursement.push(r);
    }
    return new Reimbursement(
        rD[0].reimbursementId,
        rD[0].author,
        rD[0].dateSubmitted,
        rD[0].dateResolved,
        rD[0].description,
        rD[0].resolver,
        rD[0].status,
        rD[0].type,
        rD[0].amount,
    );
}
