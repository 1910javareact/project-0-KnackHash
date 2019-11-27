import * as rdao from '../repositories/reim-dao';
import { Reim } from '../models/reim';
// import { User } from '../models/user';


export function getAllReims(): Promise<Reim[]> {
    return rdao.daoGetAllReims();
}

// export function saveOneReim(r: Reim) {
//     return rdao.daoSaveOneReim(r);
// }

// export function updateReim(id: number, user: User) {
//     const reim = rdao.daoFindReimById(id);
//     rdao.daoUpdateReim(reim);
//     return reim;
// }
