import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { multiUserDTOConvertor, userDTOtoUser } from '../util/Userdto-to-user';

export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user');
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

export async function daoSaveOneUser(u: User): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('INSERT INTO project0.user (username, "password", firstname, lastname, email, "role") values ($1,$2,$3,$4,$5,$6) RETURNING userid',
        [u.username, u.password, u.firstName, u.lastName, u.email, u.role]);
        await client.query('COMMIT');
        return userDTOtoUser(result.rows);
    } catch (e) {
        await client.query('ROLLBACK');
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(userid: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user where userid = $1', [userid]);
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'No Such User';
        }
    } catch (e) {
        if (e === 'No Such User') {
            throw {
                status: 404,
                message: 'this user does not exist'
            };
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }
}

export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.user WHERE username = $1 and password = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'bad credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'bad credentials') {
            throw {
                status: 401,
                message: 'Bad credentials'
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