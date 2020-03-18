import { Employee } from './employee.model';

export class WorkingDay {
    id: number;
    employee: Employee;
    working: boolean;
    created_at: Date;
    updated_at: Date;
    constructor(){}
}
