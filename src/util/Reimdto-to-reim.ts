import { ReimDTO } from '../dtos/reimdto';
import { Reim } from '../models/reim';

export function reimDTOtoReim(rD: ReimDTO[]): Reim {
    return new Reim(
        rD[0].reimbursementid,
        rD[0].author,
        rD[0].amount,
        rD[0].datesubmitted,
        rD[0].dateresolved,
        rD[0].description,
        rD[0].resolver,
        rD[0].status,
        rD[0].type);
}

export function multiReimDTOConvertor(rD: ReimDTO[]): Reim[] {
    let currentReim: ReimDTO[] = [];
    const result: Reim[] = [];
    for (const r of rD) {
        if (currentReim.length === 0) {
            currentReim.push(r);
        } else if (currentReim[0].reimbursementid === r.reimbursementid) {
            currentReim.push(r);
        } else {
            result.push(reimDTOtoReim(currentReim));
            currentReim = [];
            currentReim.push(r);
        }
    }
    result.push(reimDTOtoReim(currentReim));
    return result;
}