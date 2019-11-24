import { Role } from '../models/role';
import { connectionPool } from '.';

export async function getRoles (roleid: number): Promise<Role> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
          'SELECT * FROM project0.roles WHERE roleid = $1',
          [roleid]
        );
        const DbRole = result.rows[0];
        if (DbRole) {
            return {
                roleId: DbRole.roleid,
                role: DbRole.rolename
            };
        } else{
            return undefined;
        }
    } finally {
        client.release();
    }
}