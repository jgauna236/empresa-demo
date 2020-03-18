import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Employee } from 'src/app/models/employee.model';
import { WorkingDayService } from 'src/app/services/working-day.service';
import { WorkingDay } from 'src/app/models/working-day.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: '../employee/display-employee.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee;
  showDetailButton: boolean;
  employeeWorkingDays: WorkingDay[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private workingDaysService: WorkingDayService
    ) {}

  ngOnInit(): void {
    this.showDetailButton=false;
    var username = this.route.snapshot.params["username"];
      this.userService.getEmployee(username.toString()).subscribe((data)=>{
        this.employee = data;
        this.workingDaysService.getByEmployyeId(data.id).subscribe((wDays)=>{
          console.log(wDays);
          this.employeeWorkingDays= wDays;
        });
      });

  }

}
