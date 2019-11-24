import { ReimbursementStatus } from '../models/reimbursementStatus';
import { connectionPool } from '.';

export async function getReimbursementStatus (statusid: number): Promise<ReimbursementStatus> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query('SELECT * FROM project0.reimbursementstatus WHERE statusid = $1', [statusid]);
        const DbReimbursemenStatus = result.rows[0];
        if (DbReimbursemenStatus) {
            return {
                statusId: DbReimbursemenStatus.statusid,
                status: DbReimbursemenStatus.status
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}