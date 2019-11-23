import { User } from '../models/user';
import { UserDTO } from '../dtos/user-dto';

export function userDTOtoUser(uD: UserDTO[]): User {
    const roles = [];
    for (const u of uD) {
        roles.push(u.role_name);
    }
    return new User(
        uD[0].user_id,
        uD[0].username,
        uD[0].password,
        uD[0].firstName,
        uD[0].lastName,
        uD[0].email,
        roles[2]
    );
}