import { loggingMiddleware } from './middleware/logging-middleware';
import { sessionMiddleware } from './middleware/session-middleware';
// import { userRouter } from './routers/user-router';
import { getUserByUsernameAndPassword } from './services/user-service';
// import { reimbursementRouter } from './routers/reim-router';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1001;
const db = require('./routers/user-router');
const db2 = require('./routers/reim-router');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(loggingMiddleware);

app.use(sessionMiddleware);

app.get('/', (request, response) => {
    response.json({ info: 'Employee Reimbursement System Using a Node.js, Express, and Postgres API' });
  });

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.get('/reimbursements', db2.getReimbursements);
app.get('/reimbursements/:id', db2.getReimById);

// app.use('/users', userRouter);

// app.use('/reimbursements', reimbursementRouter);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('Please submit a username and password field!');
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });