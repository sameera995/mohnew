import {Person} from "../person/Person";
import {ClinicAllocation} from "./clinic-allocation/ClinicAllocation";

export interface Clinic{
    id:string;
    clinicAllocation:ClinicAllocation[];
    height:string;
    weight:string;
    vaccination:string;
    disease:string;
    thriposha:string;
    person:Person[];
    date:string;

}
