import { Component, OnInit } from '@angular/core';
import { WorkingDayService } from 'src/app/services/working-day.service';
import { WorkingDay } from 'src/app/models/working-day.model';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.css']
})
export class WorkingDaysComponent implements OnInit {
  from: Date;
  to: Date;
  workingDays: WorkingDay[];

  constructor(
    private workingDaysService: WorkingDayService
  ) {
    this.from = new Date();
    this.from.setDate(this.from.getDate()-10);
    this.to = new Date(); 
  }

  ngOnInit(): void {
      this.workingDaysService.getBetweenDates(this.from,this.to).subscribe((wDays)=>{
        console.log(wDays);
        this.workingDays= wDays;
      });

  }



  defaultDates(): any{
  }

}
