import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "./Employee";
import {HttpClient} from "@angular/common/http";
import {GenderService} from "../service/gender.service";
import {EmployeeService} from "../service/employee.service";
import {DesignationService} from "../service/designation.service";
import {CivilstatusService} from "../service/civilStatus.service";
import {MatDialog} from "@angular/material";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

export interface Gender {
  id: string;
  name: string;
}

export interface Designation {
  id: string;
  name: string;
}

export interface Civilstatus {
  id: string;
  name: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit {

  private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private genderService: GenderService,
              private employeeService: EmployeeService,
              private designationService:DesignationService,
              private civilStatusService:CivilstatusService,
              public dialog:MatDialog) {}

  form:FormGroup;
  searchForm:FormGroup;
  employees:Employee[];
  genders:string[];
  designations:string[];
  civilStatus:string[];

  ngOnInit() {

    this.formControl()
    this.loadTable()
    this.loadDesignation()
    this.loadCivilStatus()
    this.loadGender()

  }

  formControl(){
    this.form = this.formBuilder.group({
      'id':null,
      'name': [null, Validators.required],
      'gender': [null, Validators.required],
      'nic': [null, [Validators.required, Validators.pattern(/^[0-9]{9,12}[VvXx]$/)]],
      'dob': [null, Validators.required],
      'address': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'contact': [null, [Validators.required, Validators.pattern(/^[0][0-9]{9}$/)]],
      'civilStatus': [null, Validators.required],
      'designation': [null, Validators.required],
      'assignDate': [null, Validators.required],
      'employeeStatus': [null, Validators.required],
    });

      this.searchForm = this.formBuilder.group({
        "name": null,
        "nic": null
      });

  }

  loadGender(){
    this.genderService.findAll().subscribe(value => {
      console.log(value);
      this.genders = value;
    })
  }

  loadTable(){
    this.employeeService.findAll().subscribe(value => {
      console.log(value);
      this.employees = value;
    })
  }

  loadDesignation(){
  this.designationService.findAll().subscribe(value => {
  console.log(value);
  this.designations = value;
    })
  }

  loadCivilStatus(){
    this.civilStatusService.findAll().subscribe(value => {
      console.log(value);
      this.civilStatus = value;
    })
  }

  fillForm(employee: Employee){
    this.changeDateToString();
    this.form.patchValue({
      'id':employee.id,
      'name': employee.name,
      'nic': employee.nic,
      'dob': employee.dob,
      'gender': employee.gender,
      'address': employee.address,
      'email': employee.email,
      'contact': employee.contact,
      'designation':employee.designation,
      'civilStatus':employee.civilStatus,
      'assignDate': employee.assignDate,
      'employeeStatus':employee.employeeStatus
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);
  }

  onSubmit() {
    this.touch(["name", "nic","dob","gender","address","email","contact","designation","civilStatus","assignDate","employeeStatus"]);
    if (this.form.valid) {

      console.log(this.form.value);
      this.changeDateToString();
      this.http.put('http://localhost:8080/employees', this.form.value).subscribe();
      this.loadTable();
      this.form.reset();
      // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);

    }
    else {
        alert("There are some errors in this page");

    }
  }

  // onUpdate(employee:Employee):Observable<Employee> {
  //   return this.http.put<Employee>('http://localhost:8080/employees/',employee);
  // }

  delete(id:string) {
    console.log(this.form.value);
    this.http.delete('http://localhost:8080/employees/' + id, this.form.value).subscribe();
    this.loadTable();
  }

  search(){
      this.employeeService.search(this.searchForm.value).subscribe();

  }

  // compareGenders = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;
  //
  // compareDesignations = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;
  //
  // compareCivilStatus = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;


    isFieldInvalid(field: string) {
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
      );
    }

  public get dob() {
    return this.form.get("dob") as FormControl;
  }

  changeDateToString() {
    let value = this.dob.value;
    if (value instanceof Date) {
      let fullDate: string;
      fullDate = value.getFullYear().toString() + "-";

      if (value.getMonth() < 9)
        fullDate += "0" + (value.getMonth() + 1).toString() + "-";
      else
        fullDate += (value.getMonth() + 1).toString() + "-";

      if (value.getDate() < 10)
        fullDate += "0" + (value.getDate()).toString();
      else
        fullDate += value.getDate().toString();

      this.form.patchValue({
        "dob": fullDate
      });
    }
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.form.get(control).markAsTouched({onlySelf: true})
    });
  }

}
