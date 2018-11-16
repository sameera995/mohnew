import {ClinicAllocation} from "../clinic-allocation/ClinicAllocation";
import {Person} from "../../person/Person";

export interface MothersClinic {
  id:string;
  clinicAllocation:ClinicAllocation[];
  height:string;
  weight:string;
  belly:string;
  vaccination:string;
  disease:string;
  thriposha:string;
  person:Person[];
  date:string;
}
