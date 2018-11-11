import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Area} from "../area/Area";
import {Employee} from "../employee/Employee";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl: string = 'http://localhost:8080/areas';

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<Area[]>(`${this.baseUrl}`);
  }

  findEmployee() {
    return this.http.get<Employee[]>('http://localhost:8080/employees');
  }

  findAllByAreaType(areaType) {
    return this.http.get<Area[]>(`${this.baseUrl}`+`/areaType/${areaType}`)
  }

}
