import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CampaignCreation} from "../campaign/campaign-creation/CampaignCreation";

@Injectable({
  providedIn: 'root'
})
export class CampaignCreationService {

  constructor(private http:HttpClient) { }


  baseUrl: string = 'http://localhost:8080/campaigncreations';

  findAll(){
    return this.http.get<CampaignCreation[]>(`${this.baseUrl}`);

  }
}
