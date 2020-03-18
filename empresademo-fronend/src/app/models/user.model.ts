import { Role } from './role.model';

export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    lastname: string;
    roles: Role[];
    token?: string;
}
