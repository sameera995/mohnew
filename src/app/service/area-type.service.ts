import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AreaTypeService {

  baseUrl: string = 'http://localhost:8080/areatypes';

  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<string[]>(`${this.baseUrl}`);
  }
}
