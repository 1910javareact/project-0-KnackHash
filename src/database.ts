import { User } from "./models/user";
import { Role } from "./models/role";

export let users = [
    new User(1,"Admin","password","Joshua","Roy","j83roy@gmail.com",[1,"Admin"])
]

export let roles = [
    new Role(1,"Admin")
]