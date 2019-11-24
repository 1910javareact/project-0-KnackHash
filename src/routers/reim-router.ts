// import { loginCheck, finManCheck } from '../middleware/auth-middleware';
import express from 'express';
// import { getReimbursementStatus } from '../repositories/reimbursementStatus-dao';
// import { findByUserId, submit, updateReimbursement } from '../repositories/reimbursement-dao';
// import { Reimbursement } from '../models/reimbursement';
// import { PoolClient } from 'pg';
import { connectionPool } from '../repositories';
// import { buildReimbursement } from '../util/Reimdto-to-reim';

export const reimbursementRouter = express.Router();

const getReimbursements = (request, response) => {
    connectionPool.query('SELECT * FROM project0.reimbursement ORDER BY reimbursement_id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const getReimById = (request, response) => {
    const id = parseInt(request.params.id);
    connectionPool.query('SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  module.exports = {
    getReimbursements,
    getReimById,
    // createUser,
    // updateUser,
    // deleteUser,
  };

// reimbursementRouter.get('', async (req, res) => {
//     let client: PoolClient;
//     try {
//         client = await connectionPool.connect();
//         const result = await client.query('SELECT * FROM project0.reimbursement');
//         console.log(result.rows);
//         return buildReimbursement(result.rows);
//     } catch (e) {
//         console.log(e);
//         throw {
//             status: 500,
//             message: 'Internal Server Error'
//         };
//     } finally {
//         client && client.release();
//     }
// });

// reimbursementRouter.get('/status/:statusId', [finManCheck, async (req, res) => {
//     const id = +req.params.statusId;
//     if (isNaN(id)) {
//         res.sendStatus(400);
//     } else {
//         try {
//             const reimbursement = getReimbursementStatus(id);
//             res.status(200).json(reimbursement);
//         } catch (e) {
//             res.status(e.status).send(e.message);
//         }
//     }
// }]);

// reimbursementRouter.get('/author/userId/:userId', [loginCheck], (req, res) => {
//     const id = +req.params.userId;
//     if (isNaN(id)) {
//         res.sendStatus(400);
//     } else {
//         try {
//             const reimbursement = findByUserId(id);
//             res.status(200).json(reimbursement);
//         } catch (e) {
//             res.status(e.status).send(e.message);
//         }
//     }
// });

// reimbursementRouter.post('', (req, res) => {
//     const {body} = req;
//     const newR = new Reimbursement(0, 0, 0, 0, '', 0, 0, 0, 0);
//     for (const key in newR) {
//         if (body[key] === undefined) {
//             res.status(400).send('Please include all Post fields');
//             break;
//         } else {
//             newR[key] = body[key];
//         }
//     }
//     try {
//         const result = submit(newR);
//         if (result) {
//             res.sendStatus(201);
//         }
//     } catch (e) {
//         if (e === 500) {
//             res.sendStatus(500);
//         } else {
//             res.sendStatus(400);
//         }
//     }
// });

// reimbursementRouter.patch('', (req, res) => {
//     try {
//         const{body} = req;
//         const update = updateReimbursement(body);
//         if (update) {
//             res.status(200).json(update);
//         } else {
//             res.status(400).send('Reimbursement not found');
//         }
//     } catch (e) {
//         res.status(e.status).send(e.message);
//     }
// });