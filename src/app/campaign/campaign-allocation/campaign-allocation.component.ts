import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AreaService} from "../../service/area.service";
import {EmployeeService} from "../../service/employee.service";
import {HttpClient} from "@angular/common/http";
import {CampaignCreationService} from "../../service/campaign-creation.service";
import {Area} from "../../area/Area";
import {Employee} from "../../employee/Employee";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {CampaignAllocation} from "./CampaignAllocation";
import {CampaignCreation} from "../campaign-creation/CampaignCreation";
import {CampaignAllocationService} from "../../service/campaign-allocation.service";

@Component({
  selector: 'app-campaign-allocation',
  templateUrl: './campaign-allocation.component.html',
  styleUrls: ['./campaign-allocation.component.css']
})
export class CampaignAllocationComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private campaignCrService: CampaignCreationService,
    private campaignAllocationService: CampaignAllocationService,
    private areaService: AreaService,
    private employeeService: EmployeeService,
    private http: HttpClient,
  ) {
  }

  private formSubmitAttempt: boolean;

  form: FormGroup;
  searchForm: FormGroup;
  areas: Area[];
  employees: Employee[];
  campaignCreations:CampaignCreation[];

  displayedColumns: string[] = ['name', 'area', 'date', 'time', 'place', 'employee', 'action'];
  dataSource: MatTableDataSource<CampaignAllocation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      'id': null,
      'campaignCreation': [null, Validators.required],
      'area': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required],
      'place': [null, Validators.required],
      'employee': [null, Validators.required],
      'description': null

    });

    this.searchForm = this.formBuilder.group({
      'campaignCreation': this.formBuilder.group({
        "name": null
      }),
      'area': this.formBuilder.group({
        'name': null
      })
    });
  }

  loadData(campaignAllocation: CampaignAllocation[]) {
    this.dataSource = new MatTableDataSource(campaignAllocation);
    this.dataSource.paginator = this.paginator;
  }

  loadCreatedCampaigns() {
    this.campaignCrService.findAll().subscribe(value => this.campaignCreations = value);
  }

  loadArea() {
    this.areaService.findAll().subscribe(value => this.areas = value);
  }

  loadEmployee() {
    this.employeeService.findAll().subscribe(value => this.employees = value)
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  public get date() {
    return this.form.get("date") as FormControl;
  }

  public get time() {
    return this.form.get("time") as FormControl;
  }

  onSubmit() {
    this.modalRef.hide();
    this.form.patchValue({
      "date": this.convertDateToString(this.date.value),
      "time": this.convertTimeToString(this.time.value)
    });
    this.touch(["campaignCreation","employee","area","date","time","place"]);
    if (this.form.valid) {
      console.log(this.form.value);
      this.http.put('http://localhost:8080/campaignallocs', this.form.value).subscribe(value => {
        this.campaignAllocationService.findAll().subscribe(campaignAllocation => this.loadData(campaignAllocation));
      });
      this.form.reset();
    }
    else {
      window.alert("There are some errors in this page");

    }
  }

  fillForm(campaignAllocation: CampaignAllocation) {
    this.form.patchValue({
      'id': campaignAllocation.id,
      'campaignCreation': campaignAllocation.campaignCreation.name,
      'employee': campaignAllocation.employee,
      'area': campaignAllocation.area.name,
      'date': campaignAllocation.date,
      'time': campaignAllocation.time,
      'place': campaignAllocation.place,
      'description': campaignAllocation.description
    });
  }


  onDelete(id: string) {
    console.log(this.form.value);
    this.modalRef.hide();
    this.http.delete('http://localhost:8080/campaignallocs/' + id, this.form.value).subscribe(value => {
      this.campaignAllocationService.findAll().subscribe(campaignAllocation => this.loadData(campaignAllocation));
    });
  }

  onClear() {
    this.modalRef.hide();
    this.form.reset();
  }

  onSearchClear(){
    this.searchForm.reset();
    this.campaignAllocationService.findAll().subscribe(campaignAllocation => this.loadData(campaignAllocation));
  }

  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.value != ""){
      this.campaignAllocationService.search(this.searchForm.value).subscribe(campaignAllocation => this.loadData(campaignAllocation));}
  }


  touch(controls: string[]) {
    controls.forEach(control => {
      this.form.get(control).markAsTouched({onlySelf: true})
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
    console.log(this.form);
    this.touch(["campaignCreation", "employee", "area", "date", "time", "place"]);
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

  compareEmployees = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;

}
