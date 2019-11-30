import express from 'express';
import { authorization } from '../middleware/auth-middleware';
import * as reimServices from '../services/reim-service';
import { Reim } from '../models/reim';

export const reimRouter = express.Router();

reimRouter.get('', authorization(1), 
    async (req, res) => {
    const reims = await reimServices.getAllReims();
    if (reims) {
        res.json(reims);
    } else {
        res.sendStatus(500);
    }
});

reimRouter.get('/:reimbursementid', authorization(1),
    async (req, res) => {
        const reimbursementid = await +req.params.reimbursementid;
        // console.log(userid);
        if (isNaN(reimbursementid)) {
            res.status(400).send('Invalid reimbursementid');
        } else {
            try {
                const reimbursements = await reimServices.getReimbursementsByReimbursementId(reimbursementid);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

reimRouter.get('/author/:userid', authorization(1),
    async (req, res) => {
        const userid = await +req.params.userid;
        // console.log(userid);
        if (isNaN(userid)) {
            res.status(400).send('Invalid userid');
        } else {
            try {
                const reimbursements = await reimServices.getReimbursementsByUserId(userid);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });

    reimRouter.get('/status/:status', authorization(1),
    async (req, res) => {
        const status = await +req.params.status;
        // console.log(status);
        if (isNaN(status)) {
            res.status(400).send('Invalid status');
        } else {
            try {
                const reimbursements = await reimServices.getReimbursementsByStatusId(status);
                res.json(reimbursements);
            } catch (e) {
                res.status(e.status).send(e.message);
            }
        }
    });


reimRouter.post('', authorization(1 || 2 || 3),
    async (req, res) => {
        const { body } = req;
        const post = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        };
        for (const key in post) {
            if (!post[key]) {
                res.status(400).send('Please inclued all fields');
            }
        }
        try {
            const newPost = await reimServices.postReimbersement(post);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    });

reimRouter.patch('', //authorization(1),
async (req, res) => {
    try {
        const { body } = req;
        const newR = new Reim(0, 0, 0, 0, 0, '', 0, 0, 0);
        newR.reimbursementId = body.reimbursementId;
        newR.status = body.status;
        const update = await reimServices.patchReimbersement(newR);
        res.status(200).json(update);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});