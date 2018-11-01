import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";
import {PersonTypeService} from "../service/person-type.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private modalService : BsModalService,
    private http:HttpClient,
    private personTypeService:PersonTypeService
  ) { }

  form:FormGroup;
  searchForm:FormGroup;
  personTypes:string[];

  ngOnInit(){

  }


  formControl() {
    this.form= this.fb.group({
      'id': null,
      'clinicCreation': [null, Validators.required],
      'area': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required],
      'place': [null, Validators.required],
      'employee': [null, Validators.required],
      'description': null

    });

    this.searchForm= this.fb.group({
      'clinicCreation': null,
      'area': null
    });
  }

  loadPersonTypes(){
    this.personTypeService.findAll().subscribe(value => this.personTypes = value);
  }

}
