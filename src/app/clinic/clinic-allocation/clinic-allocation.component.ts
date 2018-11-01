import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClinicCreationService} from "../../service/clinic-creation.service";
import {ClinicCreation} from "../clinic-creation/CliinicCreation";
import {AreaService} from "../../service/area.service";
import {Area} from "../../area/Area";
import {Employee} from "../../employee/Employee";
import {EmployeeService} from "../../service/employee.service";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {ClinicAllocation} from "./ClinicAllocation";
import {HttpClient} from "@angular/common/http";
import {ClinicAllocationService} from "../../service/clinic-allocation.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-clinic-allocation',
  templateUrl: './clinic-allocation.component.html',
  styleUrls: ['./clinic-allocation.component.css']
})
export class ClinicAllocationComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private formBuilder : FormBuilder,
    private modalService : BsModalService,
    private clinicCrService:ClinicCreationService,
    private areaService:AreaService,
    private employeeService:EmployeeService,
    private clinicAllocationService:ClinicAllocationService,
    private http:HttpClient,

  ) { }

  private formSubmitAttempt:boolean;

  clinicAllocForm:FormGroup;
  searchForm:FormGroup;
  clinicCreations:ClinicCreation[];
  areas:Area[];
  employees:Employee[];

  displayedColumns: string[] = ['name', 'area', 'date','time','place', 'employee', 'action'];
  dataSource: MatTableDataSource<ClinicAllocation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.formControl();
    this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
    this.loadCreatedClinics();
    this.loadEmployee();
    this.loadArea();
  }

  formControl() {
    this.clinicAllocForm= this.formBuilder.group({
      'id': null,
      'clinicCreation': [null, Validators.required],
      'area': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required],
      'place': [null, Validators.required],
      'employee': [null, Validators.required],
      'description': null

    });

    this.searchForm= this.formBuilder.group({
      'clinicCreation': null,
      'area': null
    });
  }

  loadCreatedClinics(){
    this.clinicCrService.findAll().subscribe(value => this.clinicCreations = value);
  }

  loadArea(){
    this.areaService.findAll().subscribe(value => this.areas = value);
  }

  loadEmployee(){
    this.employeeService.findAll().subscribe(value => this.employees = value)
  }

  isFieldInvalid(field: string) {
    return (
      (!this.clinicAllocForm.get(field).valid && this.clinicAllocForm.get(field).touched) ||
      (this.clinicAllocForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  loadData(clinicAllocation : ClinicAllocation[]){
    this.dataSource = new MatTableDataSource(clinicAllocation);
    this.dataSource.paginator = this.paginator;
  }

  public get date() {
    return this.clinicAllocForm.get("date") as FormControl;
  }

  public get time() {
    return this.clinicAllocForm.get("time") as FormControl;
  }

  onSubmit(){
    this.clinicAllocForm.patchValue({
      "date": this.convertDateToString(this.date.value),
      "time": this.convertTimeToString(this.time.value)
    });
    // this.touch(["name","employee","areaType"]);
    if (this.clinicAllocForm.valid) {
      this.modalRef.hide();
      console.log(this.clinicAllocForm.value);
      this.http.put('http://localhost:8080/clinicallocs', this.clinicAllocForm.value).subscribe(value => {
        this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
      });
      this.clinicAllocForm.reset();
      // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);

    }
    else {
      alert("There are some errors in this page");

    }
  }

  fillForm(clinicAllocation: ClinicAllocation){
    this.clinicAllocForm.patchValue({
      'id':clinicAllocation.id,
      'clinicCreation': clinicAllocation.clinicCreation,
      'employee': clinicAllocation.employee,
      'area': clinicAllocation.area,
      'date': clinicAllocation.date,
      'time': clinicAllocation.time,
      'place': clinicAllocation.place,
      'description': clinicAllocation.description
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);
  }

  onDelete(id:string) {
    console.log(this.clinicAllocForm.value);
    this.modalRef.hide();
    this.http.delete('http://localhost:8080/clinicallocs/'+id, this.clinicAllocForm.value).subscribe(value => {
      this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
    });
  }

  onClear(){
    this.modalRef.hide();
    this.clinicAllocForm.reset();
  }

  search(){
    this.clinicAllocationService.search(this.searchForm.value).subscribe();
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.clinicAllocForm.get(control).markAsTouched({onlySelf: true})
    });
  }

  convertDateToString(value): string {
    if (value instanceof Date) {
      let fullDate: string;
      fullDate = value.getFullYear().toString() + "-";
      if (value.getMonth() < 9) {
        fullDate += "0" + (value.getMonth() + 1).toString() + "-";
      } else {
        fullDate += (value.getMonth() + 1).toString() + "-";
      }
      if (value.getDate() < 10) {
        fullDate += "0" + (value.getDate()).toString();
      } else {
        fullDate += value.getDate().toString();
      }
      return fullDate;
    }
    else
      return value;
  }

  convertTimeToString(value): string {
    if (value instanceof Date) {
      let time: string;
      time = value.getHours() < 10 ? "0" + value.getHours() : "" + value.getHours();
      time += value.getMinutes() < 10 ? ":0" + value.getMinutes() : ":" + value.getMinutes();
      return time;
    }
    else
      return value;
  }

  convertStringToTime(value: string): Date {
    let date: Date = new Date();
    date.setHours(Number.parseInt(value.slice(0, 2)));
    date.setMinutes(Number.parseInt(value.slice(3)));
    return date;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onModelNo(): void {
    this.modalRef.hide();
  }
}
