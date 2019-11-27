import express from 'express';
import bodyparser from 'body-parser';
import { loggingMiddleware } from './middleware/logging-middleware';
import { sessionMiddleware } from './middleware/session-middleware';
import { userRouter } from './routers/user-router';
import { getUserByUsernameAndPassword } from './services/user-service';

const app = express();

app.use(bodyparser.json());

app.use(loggingMiddleware);

app.use(sessionMiddleware);

app.use('/users', userRouter);

// app.use('/reimbursements', reimbursementRouter);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('please have a username and password field');
    } else {
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}
});

app.listen(1001, () => {
    console.log('Expense Reimbursement System Initialized');
});