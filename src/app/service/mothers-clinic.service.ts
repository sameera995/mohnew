import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MothersClinic} from "../clinic/mothers-clinic/MothersClinic";

@Injectable({
  providedIn: 'root'
})
export class MothersClinicService {

  baseUrl: string = 'http://localhost:8080/clinics';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<MothersClinic[]>(`${this.baseUrl}`);

  }

  findByPerson(id){
    return this.http.get<MothersClinic[]>(`${this.baseUrl}/person/${id}`);

  }
}
