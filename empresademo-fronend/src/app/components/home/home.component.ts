import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WorkingDayService } from 'src/app/services/working-day.service';
import { WorkingDay } from 'src/app/models/working-day.model';
import { User } from 'src/app/models/user.model';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { format, compareAsc, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { Employer } from 'src/app/models/employer.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  
  workingDays: WorkingDay[];
  currentWorkingDay: WorkingDay;
  currentEmployee: Employee;
  currentEmployer: Employer;
  checkedIn: boolean;
  time = new Date();
  secWorked: number;
  minWorked: number;
  hrWorked: number;
  private _searchTerm: string;
  employees: Employee[]
  filteredEmployees: Employee[];
  set searchTerm(value :string){
    this._searchTerm = value;
    this.filteredEmployees =this.filterEmployees(value);
  }
  
  
  filterEmployees(searchString: string){
    return this.employees.filter( employee=>
      employee.user.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 );
    
  }



  constructor(private userService :UserService,
    private workingDaysService: WorkingDayService, 
    private router: Router,
    ){ 
    
  }

  ngOnInit(): void {
    setInterval(() => {
       this.time = new Date();
    }, 1000);
    switch (localStorage.getItem("current_user_role")){
      case "employee":
        this.userService.getCurrentEmployee().subscribe((data)=>{
          this.currentEmployee= data;
          this.workingDaysService.current(this.currentEmployee.id).subscribe((cWDay)=>{
            this.currentWorkingDay= cWDay;
            if (cWDay.working){
              setInterval(() => {
                this.compare(new Date(), new Date(cWDay.created_at));
              }, 1000);
            }
            this.setCheckedIn();
          });
          this.workingDaysService.getByEmployyeId(this.currentEmployee.id).subscribe((cWDay)=>{
            this.workingDays = cWDay;
          });
        });
        break;
      case "employer":
        this.userService.getCurrentEmployer().subscribe((data)=>{
          this.currentEmployer= data;
        });
        this.userService.getAllEmployees().subscribe((data)=>{
          this.employees = data;
          this.filteredEmployees = data; 

        });
        //this.workingDaysService.actives().subscribe((data)=>{
        //  this.workingDays= data; 
        //});
        break;
    }
  }


  isEmployee():boolean{
    return this.currentEmployee!==undefined;
  }

  isEmployer():boolean{
    return this.currentEmployer!==undefined;
  }

  compare(dateLeft: Date, dateRight: Date){
    this.hrWorked = differenceInHours(dateLeft,dateRight)%60;
    this.minWorked = differenceInMinutes(dateLeft,dateRight)%60;
    this.secWorked = differenceInSeconds(dateLeft,dateRight)%60;
  }

  setCheckedIn(){
    this.checkedIn =  (this.currentWorkingDay !== undefined && this.currentWorkingDay.working);
  }

  checkIn(){
    this.workingDaysService.in(this.currentEmployee.id).subscribe((data)=>{
      this.setCheckedIn();
      this.router.navigated = false;
      this.router.navigate(['/home']);
    });
  }

  checkOut(){
    this.workingDaysService.out(this.currentEmployee.id).subscribe((data)=>{
      this.setCheckedIn();
      this.reloadComponent();
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home']);
}

viewEmployee(employeeId: number){
  this.router.navigate(['/employee', employeeId],{
    queryParams: {'searchTerm': this.searchTerm}
  });
}

}
