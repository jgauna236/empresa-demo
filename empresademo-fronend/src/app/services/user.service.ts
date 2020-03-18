import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Observable, Subject } from 'rxjs';
import { Employer } from '../models/employer.model';
import { EmployeeRequest } from '../models/employee-request.model';
import { EmployerRequest } from '../models/employer-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  createEmployer(employer: EmployerRequest):any {
    return  this.http.post(environment.apiUrl+'/employers/',employer);
   }


  createEmployee(employee: EmployeeRequest):any {
   return  this.http.post(environment.apiUrl+'/employees/',employee);
  }


  
  private _employeeSource= new Subject<Employee>();
  employee$ = this._employeeSource.asObservable();

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>('${environment.apiUrl}/users');
    }

  get(id: number): Observable<User>{
    return this.http.get<User>(environment.apiUrl+'/users/'+id);
  }

  getCurrent(): Observable<User>{
    return this.http.get<User>(environment.apiUrl+'/users/'+localStorage.getItem("current_user_id"));
  }

  getEmployee(userName: string): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/employees/byusername/'+userName);
  }

  getCurrentEmployee(): Observable<Employee>{
    return this.http.get<Employee>(environment.apiUrl+'/employees/byuserid/'+localStorage.getItem("current_user_id"));
  }

  getCurrentEmployer(): Observable<Employer>{
    return this.http.get<Employer>(environment.apiUrl+'/employers/byuserid/'+localStorage.getItem("current_user_id"));
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<any>(environment.apiUrl+'/employees');
    
  }

  sendEmployee(employee :Employee){
    this._employeeSource.next(employee);
  }

}
