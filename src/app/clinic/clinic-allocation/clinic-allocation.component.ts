import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClinicCreationService} from "../../service/clinic-creation.service";
import {ClinicCreation} from "../clinic-creation/ClinicCreation";
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
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private clinicCrService: ClinicCreationService,
    private areaService: AreaService,
    private employeeService: EmployeeService,
    private clinicAllocationService: ClinicAllocationService,
    private http: HttpClient,
  ) {
  }

  private formSubmitAttempt: boolean;

  clinicAllocForm: FormGroup;
  searchForm: FormGroup;
  clinicCreations: ClinicCreation[];
  areas: Area[];
  employees: Employee[];

  displayedColumns: string[] = ['name', 'area', 'date', 'time', 'place', 'employee','status', 'action'];
  dataSource: MatTableDataSource<ClinicAllocation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.createForm();
    this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
    this.loadCreatedClinics();
    this.loadEmployee();
    this.loadArea();
  }

  createForm() {
    this.clinicAllocForm = this.formBuilder.group({
      'id': null,
      'clinicCreation': [null, Validators.required],
      'area': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required],
      'place': [null, Validators.required],
      'employee': [null, Validators.required],
      'description': null,
      'status':[null, Validators.required]

    });

    this.searchForm = this.formBuilder.group({
      'clinicCreation': this.formBuilder.group({
        "name": null
      }),
      'area': this.formBuilder.group({
        'name': null
      })
    });
  }

  loadData(clinicAllocation: ClinicAllocation[]) {
    this.dataSource = new MatTableDataSource(clinicAllocation);
    this.dataSource.paginator = this.paginator;
  }

  loadCreatedClinics() {
    this.clinicCrService.findAll().subscribe(value => this.clinicCreations = value);
  }

  loadArea() {
    this.areaService.findAll().subscribe(value => this.areas = value);
  }

  loadEmployee() {
    this.employeeService.findAllByEmployeeStatus("Active").subscribe(value => this.employees = value)
  }

  isFieldInvalid(field: string) {
    return (
      (!this.clinicAllocForm.get(field).valid && this.clinicAllocForm.get(field).touched) ||
      (this.clinicAllocForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  public get date() {
    return this.clinicAllocForm.get("date") as FormControl;
  }

  public get time() {
    return this.clinicAllocForm.get("time") as FormControl;
  }

  onSubmit() {
    this.modalRef.hide();
    this.clinicAllocForm.patchValue({
      "date": this.convertDateToString(this.date.value),
      "time": this.convertTimeToString(this.time.value)
    });
    this.touch(["clinicCreation","employee","area","date","time","place","status"]);
    if (this.clinicAllocForm.valid) {
    console.log(this.clinicAllocForm.value);
    this.http.put('http://localhost:8080/clinicallocs', this.clinicAllocForm.value).subscribe(value => {
      this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
    });
    this.clinicAllocForm.reset();
    }
    else {
      window.alert("There are some errors in this page");

    }
  }

  fillForm(clinicAllocation: ClinicAllocation) {
    this.clinicAllocForm.patchValue({
      'id': clinicAllocation.id,
      'clinicCreation': clinicAllocation.clinicCreation.name,
      'employee': clinicAllocation.employee,
      'area': clinicAllocation.area.name,
      'date': clinicAllocation.date,
      'time': clinicAllocation.time,
      'place': clinicAllocation.place,
      'description': clinicAllocation.description,
      'status':clinicAllocation.status
    });
  }

  onClear() {
    this.modalRef.hide();
    this.clinicAllocForm.reset();
  }

  onSearchClear(){
    this.searchForm.reset();
    this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
  }

  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.value != ""){
    this.clinicAllocationService.search(this.searchForm.value).subscribe(clinicAllocation => this.loadData(clinicAllocation));}
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

  openModalSave(template: TemplateRef<any>) {
    console.log(this.clinicAllocForm);
    this.touch(["clinicCreation", "employee", "area", "date", "time", "place"]);
    if (this.clinicAllocForm.valid) {
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

  compareEmployees = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;
}
