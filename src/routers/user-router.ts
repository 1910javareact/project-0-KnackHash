import { connectionPool } from '../repositories';
// import express from 'express';
// import { getAllUsers } from '../services/user-service';
// import { loginCheck } from '../middleware/auth-middleware';

const getUsers = (request, response) => {
    connectionPool.query('SELECT * FROM project0.usertable ORDER BY user_id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    connectionPool.query('SELECT * FROM project0.usertable WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

//   const createUser = (request, response) => {
//     const { user_id, username, password, firstname, lastname, email } = request.body;
//     connectionPool.query('INSERT INTO project0.usertable (user_id, username, password, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, username, password, firstname, lastname, email], (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`User added`)
//     });
//   };

//   const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body
//     connectionPool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
//   }

//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     connectionPool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }

  module.exports = {
    getUsers,
    getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
  };

// export const userRouter = express.Router();

// async function controllerGetUsers(req, res) {
//     try {
//         const users = await getAllUsers();
//         res.json(users);
//     } catch (e) {
//         res.status(e.status).send(e.message);
//     }
// }

// userRouter.get('', [loginCheck, controllerGetUsers]);