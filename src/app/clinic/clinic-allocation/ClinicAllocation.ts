import {Employee} from "../../employee/Employee";
import {Area} from "../../area/Area";
import {ClinicCreation} from "../clinic-creation/CliinicCreation";

export interface ClinicAllocation {
  id:string;
  clinicCreation:ClinicCreation;
  area:Area;
  date:string;
  time:string;
  place:string;
  employee:Employee[];
  description:string;

}
