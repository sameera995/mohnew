import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "./Employee";
import {HttpClient} from "@angular/common/http";
import {GenderService} from "../service/gender.service";
import {EmployeeService} from "../service/employee.service";
import {DesignationService} from "../service/designation.service";
import {CivilstatusService} from "../service/civilStatus.service";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {ClinicAllocation} from "../clinic/clinic-allocation/ClinicAllocation";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

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
              private modalService: BsModalService,
              private civilStatusService:CivilstatusService,
              public dialog:MatDialog) {}

  form:FormGroup;
  searchForm:FormGroup;
  employees:Employee[];
  genders:string[];
  designations:string[];
  civilStatus:string[];
  modalRef: BsModalRef;

  displayedColumns: string[] = ['name', 'gender', 'nic', 'contact', 'email', 'employeeStatus', 'action'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.formControl();
    this.employeeService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
    this.loadDesignation();
    this.loadCivilStatus();
    this.loadGender();

  }

  formControl(){
    this.form = this.formBuilder.group({
      'id':null,
      'name': [null, Validators.required],
      'gender': [null, Validators.required],
      'nic': [null, [Validators.required, Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      'dob': [null, Validators.required],
      'address': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/)]],
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

  loadData(employee: Employee[]) {
    this.dataSource = new MatTableDataSource(employee);
    this.dataSource.paginator = this.paginator;
  }

  loadGender(){
    this.genderService.findAll().subscribe(value => {
      console.log(value);
      this.genders = value;
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
    if (this.form.valid) {

      console.log(this.form.value);
      this.changeDateToString();
      this.http.put('http://localhost:8080/employees', this.form.value).subscribe(value => {
        this.employeeService.findAll().subscribe(employee => this.loadData(employee));
      });
      this.modalRef.hide();
      this.form.reset();

    }
    else {
        alert("There are some errors in this page");

    }
  }

  onClear() {
    this.modalRef.hide();
    this.form.reset();
  }

  onSearchClear(){
    this.searchForm.reset();
    this.employeeService.findAll().subscribe(employee => this.loadData(employee));
  }

  openModalSave(template: TemplateRef<any>) {
    console.log(this.form);
    this.touch(["name", "nic","dob","gender","address","email","contact","designation","civilStatus","assignDate","employeeStatus"]);
    if (this.form.valid) {
      this.modalRef = this.modalService.show(template);
    }
    else {
      window.alert("There are some errors in this page");
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onModelNo(): void {
    this.modalRef.hide();
  }

  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.value != ""){
      this.employeeService.search(this.searchForm.value).subscribe(employee => this.loadData(employee));}
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
