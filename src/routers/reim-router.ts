import { loginCheck, finManCheck } from '../middleware/auth-middleware';
import express from 'express';
import { getReimbursementStatus } from '../repositories/reimbursementStatus-dao';
import { findByUserId, submit, updateReimbursement } from '../repositories/reimbursement-dao';
import { Reimbursement } from '../models/reimbursement';

export const reimbursementRouter = express.Router();

reimbursementRouter.get('/status/:statusId', [finManCheck, async (req, res) => {
    const id = +req.params.statusId;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const reimbursement = getReimbursementStatus(id);
            res.status(200).json(reimbursement);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
}]);

reimbursementRouter.get('/author/userId/:userId', [loginCheck], (req, res) => {
    const id = +req.params.userId;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const reimbursement = findByUserId(id);
            res.status(200).json(reimbursement);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

reimbursementRouter.post('', [loginCheck], (req, res) => {
    const {body} = req;
    const newR =  new Reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0);
    for (const key in newR) {
        if (body[key] === undefined) {
            res.status(400).send('Please include all reimbursement fields');
            break;
        } else {
            newR[key] = body[key];
        }
    }
    if (submit(newR)) {
        res.sendStatus(201);
    } else {
        res.sendStatus(500);
    }
});

reimbursementRouter.patch('', [finManCheck], (req, res) => {
    try {
        const{body} = req;
        const update = updateReimbursement(body);
        if (update) {
            res.status(200).json(update);
        } else {
            res.status(400).send('Reimbursement not found');
        }
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});