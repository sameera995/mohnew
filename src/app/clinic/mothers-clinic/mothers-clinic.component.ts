import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AreaService} from "../../service/area.service";
import {EmployeeService} from "../../service/employee.service";
import {ClinicAllocationService} from "../../service/clinic-allocation.service";
import {PersonService} from "../../service/person.service";
import {HttpClient} from "@angular/common/http";
import {ClinicAllocation} from "../clinic-allocation/ClinicAllocation";
import {Person} from "../../person/Person";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {DataSet} from "../data-set";
import {MothersClinic} from "./MothersClinic";
import {MothersClinicService} from "../../service/mothers-clinic.service";

@Component({
  selector: 'app-mothers-clinic',
  templateUrl: './mothers-clinic.component.html',
  styleUrls: ['./mothers-clinic.component.css']
})
export class MothersClinicComponent implements OnInit {

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
              private mothersClinicService: MothersClinicService,
              private http: HttpClient,) {
  }

  private formSubmitAttempt:boolean;
  modalRef: BsModalRef;

  form: FormGroup;
  searchForm: FormGroup;
  clinicAllocations: ClinicAllocation[];
  mothersClinic: MothersClinic[];
  persons: Person[];

  displayedColumns: string[] = ['date', 'height', 'weight', 'vaccination', 'disease', 'thriposha'];
  dataSource: MatTableDataSource<MothersClinic>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.formControl();
    // this.personService.findAllByPersonStatusAndType("Active",'0').subscribe(value => this.persons = value);
    this.personService.findAllByPersonStatus("Active").subscribe(value => this.persons = value);
    this.mothersClinicService.findAll().subscribe(mothersClinic => this.loadData(mothersClinic));
    this.loadAllocatedClinics();
  }

  formControl() {
    this.form = this.formBuilder.group({
      'id': null,
      'person': null,
      "clinicAllocation": null,
      'height': [null],
      'weight': [null],
      'belly':[null],
      'vaccinationAndMedicine': [null],
      'thriposha': [null],
      'disease': [null]

    });
  }

  loadData(mothersClinic: MothersClinic[]) {
    this.dataSource = new MatTableDataSource(mothersClinic);
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

  onSubmit() {
    this.modalRef.hide();
    // this.touch(["clinicCreation","employee","area","date","time","place"]);
    // if (this.form.valid) {
    console.log(this.form.value);
    this.http.put('http://localhost:8080/clinics', this.form.value).subscribe(value => {
      this.mothersClinicService.findAll().subscribe(mothersClinic => this.loadData(mothersClinic));
    });
    this.form.reset();
    // }
    // else {
    //   window.alert("There are some errors in this page");
    //
    // }
  }

  loadWeightReport(person :Person) {
    this.personService.getWieghtReport(person.id).subscribe(value => {
      console.log(value);
      this.dataSet.push(value);
    });
    this.mothersClinicService.findByPerson(person.id).subscribe(mothersClinic => this.loadData(mothersClinic));
  }

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
