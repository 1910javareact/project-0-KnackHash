import { connectionPool } from '.';
import { Reimbursement } from '../models/reimbursement';
import { buildReimbursement } from '../util/Reimdto-to-reim';

export async function findByStatusId(statusid: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE statusid = $1 ORDER BY datesubmitted ASC',
        [statusid]
      );
      if (result) {
        return Promise.all(result.rows.map(async (DbReimbursement) => {
          return await buildReimbursement(DbReimbursement);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release();
    }
  }

  export async function findByUserId(userid: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE author = $1 ORDER BY datesubmitted ASC',
        [userid]
      );
      if (result) {
        return Promise.all(result.rows.map(async (DbReimbursement) => {
          return await buildReimbursement(DbReimbursement);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release();
    }
  }

  export async function submit(r: Reimbursement): Promise<Reimbursement> {
     const client = await connectionPool.connect();
     try {
         await client.query('BEGIN');
         await client.query('INSERT INTO project0.reimbursement ("reimbursement_id", "author", "datesubmitted", "dateresolved", "description", "resolver", "status", "reimbursementtype", "amount") values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING reimbursement_id',
         [r.reimbursementId, r.author, r.dateSubmitted, r.dateResolved, r.description, r.resolver, r.status, r.type, r.amount]);
         await client.query('COMMIT');
         return r;
     } catch (e) {
         await client.query('ROLLBACK');
         throw {
             status: 500,
             message: 'Internal Server Error'
         };
     } finally {
         client && client.release();
     }
 }

export async function updateReimbursement(req) {
    const client = await connectionPool.connect();
    const dateresolved = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const resolver = req.session.user.userId;
    const statusid = req.body.status.statusId;
    const typeid = req.body.type.typeId;
    const reimbursementid = req.body.reimbursementId;
    if (typeof reimbursementid !== 'number' || typeof statusid !== 'number' || typeof typeid !== 'number' ) {
        return undefined;
      }
    try {
        if (reimbursementid && statusid && typeid) {
            const result = await client.query(
                'UPDATE project0.reimbursements set dateresolved = $1, resolver = $2, statusid = $3, typeid = $4 WHERE reimbursementid = $5 RETURNING reimbursementid',
                [dateresolved, resolver, statusid, typeid, reimbursementid]
            );
            if (result) {
                return result.rows[0].reimbursementid;
            } else {
                 return undefined;
            }
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}


  export async function findByRId(reimbursementid: number): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE reimbursementid = $1',
        [reimbursementid]
      );
      const DbReimbursement = result.rows[0];
      if (DbReimbursement) {
        return await buildReimbursement(DbReimbursement);
      } else {
        return undefined;
      }
    } finally {
      client.release();
    }
  }