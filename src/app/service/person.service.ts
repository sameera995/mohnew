import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../person/Person";
import {Observable} from "rxjs";
import {ClinicAllocation} from "../clinic/clinic-allocation/ClinicAllocation";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl: string = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<Person[]>(`${this.baseUrl}`);
  }

  search(person: {}): Observable<Person[]> {
    return this.http.put<Person[]>(`http://localhost:8080/persons/search`, person)
      .pipe(
        delay(0)
      );
  }
}
