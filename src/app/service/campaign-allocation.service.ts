import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {CampaignAllocation} from "../campaign/campaign-allocation/CampaignAllocation";

@Injectable({
  providedIn: 'root'
})
export class CampaignAllocationService {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = 'http://localhost:8080/campaignallocs';

  findAll() {
    return this.http.get<CampaignAllocation[]>(`${this.baseUrl}`);

  }

  search(campaignAllocation: {}): Observable<CampaignAllocation[]> {
    return this.http.put<CampaignAllocation[]>(`http://localhost:8080/campaignallocs/search`, campaignAllocation)
      .pipe(
        delay(0)
      );
  }
}
