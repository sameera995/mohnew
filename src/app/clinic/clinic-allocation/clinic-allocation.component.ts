import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ClinicCreationService} from "../../service/clinic-creation.service";

@Component({
  selector: 'app-clinic-allocation',
  templateUrl: './clinic-allocation.component.html',
  styleUrls: ['./clinic-allocation.component.css']
})
export class ClinicAllocationComponent implements OnInit {

  constructor(
    private ClinicCrService:ClinicCreationService,

  ) { }

  clinicAllocForm:FormGroup;

  ngOnInit() {
  }

  loadCreatedClinics(){
    this.ClinicCrService.findAll().subscribe(value => this)
  }

}
