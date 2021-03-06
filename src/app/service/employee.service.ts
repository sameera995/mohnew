import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../employee/Employee";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: String = 'http://localhost:8080/employees';

  constructor( private http:HttpClient) { }

  findAll(){
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  findAllByEmployeeStatus(employeeStatus:string){
    return this.http.get<Employee[]>(`${this.baseUrl}/employeeStatus/${employeeStatus}`);
  }

  findAllByDesignation(designation:string){
    return this.http.get<Employee[]>(`${this.baseUrl}/designation/${designation}`);
  }

  findAvailableEmplloyees(startTime:string, endTime:string, date:string){
    return this.http.get<Employee[]>(`${this.baseUrl}/getAvailable`,{params:{date:date,startTime:startTime,endTime:endTime}});
  }

  findByArea(area:string){
    return this.http.get<Employee[]>(`${this.baseUrl}/${area}`);
  }

  search(employee: { name: string, nic: string }): Observable<Employee[]> {
    return this.http.put<Employee[]>(`http://localhost:8080/employees/search`, employee)
      .pipe(
        delay(0)
      );
  }


}
