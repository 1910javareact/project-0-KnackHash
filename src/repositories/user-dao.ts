import { User } from '../models/user';
import { users } from '../database';
import { PoolClient } from 'pg';
import { connectionPool } from '.';

let userId = 2;

export async function daoGetAllUsers(): Promise<User[]> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const result = client.query('SELECT * FROM "project0".user');
    console.log((await result).rows); // quick fix added await. Might be broken.
    return null;
  } catch (e) {
    console.log(e);
  } finally {
    client && client.release();
  }
  return users;
}

export function daoSaveOneUser(u: User) {
  u.userId = userId;
  userId++;
  users.push(u);
  return true;
}

export function daoGetUserById(id: number): User {
  for (const u of users) {
    if (u.userId === id) {
      return u;
    }
  }
  throw {
    status: 404,
    message: 'this user does not exist'
  };
}

export function daoGetUserByUsernameAndPassword(
  username: string,
  password: string
) {
  for (const u of users) {
    if (u.username === username && u.password === password) {
      return u;
    }
  }
  throw {
    status: 400,
    message: 'Invalid credentials'
  };
}
