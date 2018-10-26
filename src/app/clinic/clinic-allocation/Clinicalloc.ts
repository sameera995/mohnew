import {Employee} from "../../employee/Employee";
import {Area} from "../../area/Area";
import {ClinicCreation} from "../clinic-creation/CliinicCreation";

export  interface Cinicalloc {
  id:string;
  clinic:ClinicCreation;
  area:Area;
  Date:string;
  Time:string;
  place:string;
  employee:Employee;
  description:string;

}
