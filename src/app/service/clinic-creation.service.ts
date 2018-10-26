import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClinicCreation} from "../clinic/clinic-creation/CliinicCreation";

@Injectable({
  providedIn: 'root'
})
export class ClinicCreationService {

  constructor(private http:HttpClient) { }


  baseUrl: string = 'http://localhost:8080/cliniccreations';

  findAll(){
    return this.http.get<ClinicCreation[]>(`${this.baseUrl}`);

  }

  findType(){
    return this.http.get<string[]>('http://localhost:8080/clinicTypes');

  }
}
