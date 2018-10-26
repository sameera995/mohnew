import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  baseUrl: string = 'http://localhost:8080/persontypes';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<string[]>(`${this.baseUrl}`);

  }
}
