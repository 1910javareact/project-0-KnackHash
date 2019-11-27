import express from 'express';
import * as rservice from '../services/reim-service';
// import { Reim } from '../models/reim';
// import { authorization } from '../middleware/auth-middleware';

export const reimRouter = express.Router();

reimRouter.get('', (req, res) => {
    const reims = rservice.getAllReims();
    if (reims) {
        res.json(reims);
    } else {
        res.sendStatus(500);
    }
});

// reimRouter.post('', (req, res) => {
//     const {body} = req;
//     const {author} = body;
//     const newR = new Reim(0, 0, 0, 0, 0, '', 0, 0, 0);
//     for (const key in newR) {
//         console.log(body[key]);
//         if (body[key] === undefined) {
//             res.status(400).send('Please include all reimbursement fields');
//             break;
//         } else {
//             newR[key] = body[key];
//         }
//     }
//     if (!author) {
//         res.status(400).send('Please include all reimbursement fields');
//     }
//     try {
//         const result = rservice.saveOneReim(newR);
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

// reimRouter.patch('/:id', [authorization(1 || 2 || 3), (req, res) => {
//     const id = +req.params.id;
//     const user = req.session.user;
//     try {
//         const reim = rservice.updateReim(id, user);
//         res.json(reim);
//     } catch (e) {
//         res.status(e.status).send(e.message);
//     }
// }]);