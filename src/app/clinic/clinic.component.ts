import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  constructor() {}

  clinicForm:FormGroup;
  searchForm:FormGroup;

  ngOnInit() {}




}
