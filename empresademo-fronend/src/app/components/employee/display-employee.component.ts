import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Employee } from 'src/app/models/employee.model';
import { WorkingDay } from 'src/app/models/working-day.model';
import { WorkingDayService } from 'src/app/services/working-day.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  private selectedEmployeeId: number;
  @Input() employee: Employee;
  @Input() searchTerm: string;

  edit: boolean;
  showDetailButton: boolean;
  employeeWorkingDays: WorkingDay[];

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private userService: UserService,
    private workingDaysService: WorkingDayService
    ) { }

  ngOnInit( ): void {
    this.showDetailButton=true;
    this.edit=false;
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }      

  viewEmployee(){
    this._router.navigate(['/employees', this.employee.id],{
      queryParams: {
        'searchTerm': this.searchTerm
      }
    })
  }

  editing():boolean{
    return this.edit;
  }



  editNow(){
  }
}
