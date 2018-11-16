import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../person/Person";
import {Observable} from "rxjs";
import {ClinicAllocation} from "../clinic/clinic-allocation/ClinicAllocation";
import {delay} from "rxjs/operators";
import {DataSet} from "../clinic/data-set";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl: string = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<Person[]>(`${this.baseUrl}`);
  }

  findAllByPersonStatus(personStatus:string){
    return this.http.get<Person[]>(`${this.baseUrl}/personStatus/${personStatus}`);
  }

  findAllByPersonStatusAndType(personStatus:string, personType:any){
    return this.http.get<Person[]>(`${this.baseUrl}/personStatusAndType`, {params: {personStatus:personStatus, personType:personType} });
  }

  search(person: {}): Observable<Person[]> {
    return this.http.put<Person[]>(`http://localhost:8080/persons/search`, person)
      .pipe(
        delay(0)
      );
  }

  getWieghtReport(id: string) {
    return this.http.get<DataSet>(`${this.baseUrl}/getWeight/${id}`);
  }
}
