import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Clinic} from "../clinic/Clinic";

@Injectable({
  providedIn: 'root'
})
export class ClinicService {



  baseUrl: string = 'http://localhost:8080/clinics';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<Clinic[]>(`${this.baseUrl}`);

  }




}
