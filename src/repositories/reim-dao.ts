import { Reim } from '../models/reim';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { multiReimDTOConvertor } from '../util/Reimdto-to-reim';

export async function daoGetAllReims(): Promise<Reim[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement');
        return multiReimDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

// export function daoSaveOneReim(r: Reim): boolean {
//     console.log(r);
//     for (const obj of users) {
//         let match = false;
//        for (const key in r.author) {
//            if (r.author[key] !== obj[key]) {
//                match = false;
//                break;
//            } else {
//                match = true;
//            }
//        }
//        if (match) {
//            reims.push(r);
//            return true;
//        }
//     }
//         throw 500;

// }

// export function daoFindReimById(id: number): Reim {
//     for (const r of reims) {
//         if (r.id === id) {
//             return r;
//         }
//     }
//     throw{
//         status: 404,
//         message: 'NoSuchReimbursement'
//     };
// }

// export function daoUpdateReim(reim: Reim) {
//     const newReims = [...reims];
//     for (let i = 0; i < newReims.length; i++ ) {
//         if (newReims[i].id === reim.id) {
//             newReims[i] = reim;
//         }
//     }
// }