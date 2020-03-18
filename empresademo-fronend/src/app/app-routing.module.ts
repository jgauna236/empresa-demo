import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DisplayEmployeeComponent } from './components/employee/display-employee.component';
import { EmployeeRegistrerComponent } from './components/employee-registrer/employee-registrer.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { WorkingDaysComponent } from './components/working-days/working-days.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';


const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'login' 
  },
  { 
    path: 'login', 
    component: LogInComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'employee-register', 
    component: EmployeeRegistrerComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'employer'
    }  
  },
  { 
    path: 'employee-detail/:username', 
    component: EmployeeDetailComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'employer'
    }   
  },
  { 
    path: 'working-days', 
    component: WorkingDaysComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'employer'
    }   
  },
  { 
    path: 'employee', 
    component: DisplayEmployeeComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'employer'
    }   
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
