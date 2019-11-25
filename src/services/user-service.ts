import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetAllUsers } from '../repositories/user-dao';
import { PoolClient } from 'pg';
import { connectionPool } from '../repositories';

export function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return daoGetUserByUsernameAndPassword(username, password);
}

export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e;
    }

}

export async function saveOneUser(u: User): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO project0.usertable ("user_id", "username", "password", "firstname", "lastname", "email") values ($1,$2,$3,$4,$5,$6) RETURNING username',
        [u.userId, u.username, u.password, u.firstName, u.lastName, u.email]);
        await client.query('COMMIT');
        return u;
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