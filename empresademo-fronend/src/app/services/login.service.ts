import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private isLoggedin: boolean;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
    ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.isLoggedin = false;
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const auth = {
      username: username,
      password: password
    }
    return this.http.post<any>(environment.apiUrl+'/user_token', {auth}).pipe(map(res => {
      localStorage.setItem('access_token', res.jwt);
    }));
  }

  register(username:string) {
    return this.http.get<any>(environment.apiUrl+'/users/byusername/'+username).pipe(tap(res => {
      localStorage.setItem('current_user_id', res.id);
      localStorage.setItem('current_user_role', res.roles[0].name);
    }));
  }


  destroyToken(){
    localStorage.removeItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user_id');
    localStorage.removeItem('current_user_role');
    localStorage.removeItem('current_username');
  }

  isLoggedIn(): boolean{
    var token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isEmployee() :boolean{
    return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employee")
  } 

  public isEmployer() :boolean{
    return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employer")
  }



}
