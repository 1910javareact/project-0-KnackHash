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
        uD[0].email
    );
}

export function multiUserDTOConvertor(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uD) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].user_id === u.user_id) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}