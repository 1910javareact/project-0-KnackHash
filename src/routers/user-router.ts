import express from 'express';
import { getAllUsers } from '../services/user-service';
import { loginCheck } from '../middleware/auth-middleware';

export const userRouter = express.Router();

async function controllerGetUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

userRouter.get('', [loginCheck, controllerGetUsers]);