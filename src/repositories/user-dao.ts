import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { User } from '../models/user';
import { userDTOtoUser, multiUserDTOConvertor } from '../util/Userdto-to-user';

export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.usertable natural join project0.user_roles natural join project0.roles WHERE username = $1 and password = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'The incoming token has expired';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'The incoming token has expired') {
            throw {
                status: 401,
                message: 'The incoming token has expired'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.usertable natural join project0.user_roles natural join project0.roles');
        console.log(result.rows);
        return multiUserDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(id: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user NATURAL JOIN project0.user_role NATURAL JOIN project0.role WHERE user_id = $1',
        [id]);
        if (result.rowCount === 0) {
            throw 'User does not exist';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'User does not exist') {
            throw{
                status: 404,
                message: 'User not found'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}

