import { connectionPool } from '.';
import { ReimbursementType } from '../models/reimbursementType';

export async function getReimbursementType (typeid: number): Promise<ReimbursementType> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query('SELECT * FROM project0.reimbursementtype WHERE typeid = $1', [typeid]);
        const DbReimbursementType = result.rows[0];
        if (DbReimbursementType) {
            return {
                typeId: DbReimbursementType.typeid,
                type: DbReimbursementType.typename
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}