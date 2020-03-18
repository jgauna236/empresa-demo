import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LoginService } from './login.service';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: LoginService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('access_token');
    console.log("hola");
    // decode the token to get its payload
    const role = localStorage.getItem('current_user_role');
    if (
      !this.auth.isLoggedIn() 
      
    ){
      this.router.navigate(['login']);
      return false;

    } else if (role !== expectedRole){
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}