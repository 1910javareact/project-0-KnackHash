import express from 'express';
import { getAllUsers } from '../services/user-service';
// import { authorization } from '../middleware/auth-middleware';

export const userRouter = express.Router();

async function controllerGetUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

userRouter.get('', controllerGetUsers); //Had to disabled authentication, role of User is showing, but nothing will authenticate.