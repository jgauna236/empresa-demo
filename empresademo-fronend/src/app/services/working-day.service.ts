import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorkingDay } from '../models/working-day.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WorkingDayService {

  formaDateTime: string;
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe
    ) {
    this.formaDateTime = "yyyy-MM-dd'T'HH:mm:ssZ";
  }

  getBetweenDates(from: Date, to: Date): Observable<WorkingDay[]>{
    return this.http.post<any>(environment.apiUrl+'/working_days/betweendates/', {
      from: this.datepipe.transform(from, this.formaDateTime).toString(),
      to: this.datepipe.transform(to, this.formaDateTime).toString()});
  }

  getByEmployyeId(id: number): Observable<WorkingDay[]>{
    return this.http.get<any>(environment.apiUrl+'/working_days/byemployeeid/'+id);
  }

  actives(): Observable<WorkingDay[]> {
    return this.http.get<any>(environment.apiUrl+'/working_days/actives');
  }

  current(employee_id: number): Observable<WorkingDay> {
    return this.http.get<WorkingDay>(environment.apiUrl+'/working_days/current/'+employee_id);
  }

  in(employee_id: number){
    return this.http.post<any>(environment.apiUrl+'/working_days/in/'+employee_id,{});
  }

  out(employee_id: number){
    return this.http.post<any>(environment.apiUrl+'/working_days/out/'+employee_id,{});
  }
}
