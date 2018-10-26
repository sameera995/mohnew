import { Injectable } from '@angular/core';
import {Civilstatus, Designation} from "../employee/employee.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CivilstatusService {

  baseUrl: string = 'http://localhost:8080/civilstatus';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<string[]>(`${this.baseUrl}`);

  }
}
