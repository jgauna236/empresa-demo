import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empresademo-fronend';

  constructor(
    public loginService: LoginService, 
    private router: Router){
    
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
  
  public isEmployee() :boolean{
    return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employee")
  } 

  public isEmployer() :boolean{
    return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employer")
  }
}
