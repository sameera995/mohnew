import {Area} from "../../area/Area";
import {Employee} from "../../employee/Employee";
import {CampaignCreation} from "../campaign-creation/CampaignCreation";

export interface CampaignAllocation {
  id:string;
  campaignCreation:CampaignCreation;
  area:Area;
  date:string;
  startTime:string;
  endTime:string;
  place:string;
  employee:Employee[];
  description:string;
  status:string;
}
