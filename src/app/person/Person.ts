import {Area} from "../area/Area";

export interface Person {
  id: string;
  name: string;
  gender: string;
  dob: string;
  address: string;
  contact: string;
  area: Area[];
  personType: string;
  parentName: string;
  parentOccupation: string;
  numberOfSiblings: string;
  personStatus: string;
}
