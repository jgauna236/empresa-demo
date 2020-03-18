import { User } from './user.model';

export class EmployeeRequest {
    id: number;
    age: number;
    user_attributes: User;
}
