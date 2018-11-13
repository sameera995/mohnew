import {ClinicCreation} from "../../clinic/clinic-creation/ClinicCreation";
import {Area} from "../../area/Area";
import {Employee} from "../../employee/Employee";
import {CampaignCreation} from "../campaign-creation/CampaignCreation";

export interface CampaignAllocation {
  id:string;
  campaignCreation:CampaignCreation;
  area:Area;
  date:string;
  time:string;
  place:string;
  employee:Employee[];
  description:string;
}
