import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClinicAllocation} from "../clinic/clinic-allocation/ClinicAllocation";
import {Observable} from "rxjs";
import {Employee} from "../employee/Employee";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClinicAllocationService {

  constructor(private http:HttpClient) { }

  baseUrl: string = 'http://localhost:8080/clinicallocs';

  findAll(){
    return this.http.get<ClinicAllocation[]>(`${this.baseUrl}`);

  }

  search(clinicAllocation: { clinicCreation: string, area: string }): Observable<ClinicAllocation[]> {
    return this.http.put<ClinicAllocation[]>(`http://localhost:8080/clinicallocs/search`, clinicAllocation)
      .pipe(
        delay(0)
      );
  }
}
