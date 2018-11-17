import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AreaService} from "../service/area.service";
import {EmployeeService} from "../service/employee.service";
import {ClinicAllocationService} from "../service/clinic-allocation.service";
import {HttpClient} from "@angular/common/http";
import {Clinic} from "./Clinic";
import {PersonService} from "../service/person.service";
import {Person} from "../person/Person";
import {ClinicService} from "../service/clinic.service";
import {ClinicAllocation} from "./clinic-allocation/ClinicAllocation";
import {DataSet} from "./data-set";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  modalRef: BsModalRef;

  dataSet: DataSet[] = [
    {data: [2000, 2700, 3500, 4000, 4500, 4800, 5100, 5400, 5600, 5800, 6000, 6100, 6300], label: 'Min Weight'},
    {data: [4800, 6200, 7500, 8500, 9300, 10000, 10500, 11000, 11500, 12000, 12400, 12800, 13150], label: 'Max Weight'}
  ];

  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private areaService: AreaService,
              private employeeService: EmployeeService,
              private clinicAllocationService: ClinicAllocationService,
              private personService: PersonService,
              private clinicService: ClinicService,
              private http: HttpClient,) {
  }

  private formSubmitAttempt: boolean;

  form: FormGroup;
  searchForm: FormGroup;
  clinicAllocations: ClinicAllocation[];
  clinics: Clinic[];
  persons: Person[];


  displayedColumns: string[] = ['date', 'height', 'weight', 'vaccination', 'disease', 'thriposha'];
  dataSource: MatTableDataSource<Clinic>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.formControl();
    this.loadAllocatedClinics();
    this.personService.findAllByPersonStatusAndType("Active",'Baby').subscribe(value => this.persons = value);
    // this.personService.findAllByPersonStatus("Active").subscribe(value => this.persons = value);
    this.clinicService.findAll().subscribe(clinic => this.loadData(clinic));

    this.loadWeightReport("1");
  }


  formControl() {
    this.form = this.formBuilder.group({
      'id': null,
      'person': null,
      "clinicAllocation": null,
      'height': [null],
      'weight': [null],
      'vaccination': [null],
      'thriposha': null,
      'disease': [null]

    });
  }


  public get personValue() {
    return this.form.get("person") as FormControl;
  }

  loadData(clinic: Clinic[]) {
    this.dataSource = new MatTableDataSource(clinic);
    this.dataSource.paginator = this.paginator;
  }

  loadAllocatedClinics() {
    this.clinicAllocationService.findAll().subscribe(value => this.clinicAllocations = value);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  loadWeightReport(id: string) {
    this.personService.getWieghtReport(id).subscribe(value => {
      console.log(value);
      this.dataSet.push(value);
    });
    this.clinicService.findByPerson(id).subscribe(clinic => this.loadData(clinic));
  }


  onSubmit() {
    this.modalRef.hide();
    // this.touch(["clinicCreation","employee","area","date","time","place"]);
    // if (this.form.valid) {
    console.log(this.form.value);
    this.http.put('http://localhost:8080/clinics', this.form.value).subscribe(value => {
      this.clinicService.findAll().subscribe(clinic => this.loadData(clinic));
    });
    this.form.reset();
    // }
    // else {
    //   window.alert("There are some errors in this page");
    //
    // }
  }


  //
  // fillForm(clinicAllocation: ClinicAllocation) {
  //   this.form.patchValue({
  //     'id': clinicAllocation.id,
  //     'clinicCreation': clinicAllocation.clinicCreation.name,
  //     'employee': clinicAllocation.employee,
  //     'area': clinicAllocation.area.name,
  //     'date': clinicAllocation.date,
  //     'time': clinicAllocation.time,
  //     'place': clinicAllocation.place,
  //     'description': clinicAllocation.description
  //   });
  //   // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);
  // }
  //
  //
  // onDelete(id: string) {
  //   console.log(this.form.value);
  //   this.modalRef.hide();
  //   this.http.delete('http://localhost:8080/clinicallocs/' + id, this.form.value).subscribe(value => {
  //     this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
  //   });
  // }
  //
  // onClear() {
  //   this.modalRef.hide();
  //   this.form.reset();
  // }
  //
  // onSearchClear(){
  //   this.searchForm.reset();
  //   this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
  // }
  //
  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.value != "") {
      this.personService.search(this.searchForm.value).subscribe(value => this.persons = value);
    }
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.form.get(control).markAsTouched({onlySelf: true})
    });
  }

  openModalSave(template: TemplateRef<any>) {
    console.log(this.form);
    // this.touch(["clinicCreation", "employee", "area", "date", "time", "place"]);
    // if (this.form.valid) {
    this.modalRef = this.modalService.show(template);
    // }
    // else {
    //   window.alert("There are some errors in this page");
    // }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onModelNo(): void {
    this.modalRef.hide();
  }

}
