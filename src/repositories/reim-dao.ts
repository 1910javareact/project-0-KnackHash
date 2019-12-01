import { Reim } from '../models/reim';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { multiReimDTOConvertor, reimDTOtoReim } from '../util/Reimdto-to-reim';

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

export async function daoGetReimbursementsByStatusId(status: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement where status = $1 ORDER BY datesubmitted DESC',
        [status]);
        if (result.rowCount === 0) {
            throw 'No reimbursements with that status';
        } else {
            return multiReimDTOConvertor(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements with that status') {
            throw {
                status: 404,
                message: 'No reimbursements with that status'
            };
        } else {
            throw{
                status: 500,
                Message: 'Something went wrong, try again'
            };
        }

    } finally {
        client.release();
    }
}

export async function daoGetReimbursementsByUserId(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE author = $1 ORDER BY datesubmitted DESC',
        [userid]);
        if (result.rowCount === 0) {
            throw 'No Reimbursements By That User';
        } else {
            return multiReimDTOConvertor(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements with that user') {
            throw {
                status: 404,
                message: 'No reimbursements with that user'
            };
        } else {
            throw{
                status: 500,
                Message: 'Something went wrong, try again'
            };
        }

    } finally {
        client.release();
    }
}

export async function daoPostReimbersement(Reim) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('INSERT INTO project0.reimbursement (author, amount, datesubmitted, description, status, type) values ($1,$2,$3,$4,1,$5)',
            [Reim.author, Reim.amount, Reim.dateSubmitted, Reim.description, Reim.type]);
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE author = $1 ORDER BY reimbursementid DESC LIMIT 1 OFFSET 0',
             [Reim.author]);
        client.query('COMMIT');
        return reimDTOtoReim(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal server error'
        };
    } finally {
        client.release();
    }
}

export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE reimbursementid = $1',
        [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'Reimbursement does not exist';
        } else {
            return reimDTOtoReim(result.rows);
        }
    } catch (e) {
        if (e === 'Reimbursement does not exist') {
            throw{
                status: 404,
                message: 'Reimbursement does not exist'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}

export async function daoUpdateReimbursement(r: Reim) {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            client.query('BEGIN');
            await client.query(`UPDATE project0.reimbursement SET author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6,
            resolver = $7, status = $8, type = $9 WHERE reimbursementid = $1;`,
            [r.reimbursementId, r.author, r.amount, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type]);
            client.query('COMMIT');
        } catch (e) {
            client.query('ROLLBACK');
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        } finally {
            client.release();
        }
    }