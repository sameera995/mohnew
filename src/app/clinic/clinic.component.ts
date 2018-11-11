import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {ClinicAllocation} from "./clinic-allocation/ClinicAllocation";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AreaService} from "../service/area.service";
import {EmployeeService} from "../service/employee.service";
import {ClinicAllocationService} from "../service/clinic-allocation.service";
import {HttpClient} from "@angular/common/http";
import {Clinic} from "./Clinic";
import {PersonService} from "../service/person.service";
import {Person} from "../person/Person";
@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private areaService: AreaService,
              private employeeService: EmployeeService,
              private clinicAllocationService: ClinicAllocationService,
              private personService: PersonService,
              private http: HttpClient,) {}
              
  private formSubmitAttempt:boolean;
  
  form:FormGroup;
  searchForm:FormGroup;
  clinics:Clinic[];
  persons:Person[];

  displayedColumns: string[] = ['name', 'area'];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.formControl();
    this.loadPersons();
  }


  formControl() {
    this.form = this.formBuilder.group({
      'id': null,
      'person': [null, Validators.required],
      'height': [null, Validators.required],
      'weight': [null, Validators.required],
      'vaccination': [null, Validators.required],
      'thriposha': [null, Validators.required]

    });

    this.searchForm = this.formBuilder.group({
      'name': null,
      'nic': null
    });
  }

  loadData(person: Person[]) {
    this.dataSource = new MatTableDataSource(person);
    this.dataSource.paginator = this.paginator;
  }

  loadPersons() {
    this.personService.findAll().subscribe(value => this.persons = value);
  }
  //
  // loadArea() {
  //   this.areaService.findAll().subscribe(value => this.areas = value);
  // }
  //
  // loadEmployee() {
  //   this.employeeService.findAll().subscribe(value => this.employees = value)
  // }

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

  // onSubmit() {
  //   this.modalRef.hide();
  //   this.form.patchValue({
  //     "date": this.convertDateToString(this.date.value),
  //     "time": this.convertTimeToString(this.time.value)
  //   });
  //   // this.touch(["clinicCreation","employee","area","date","time","place"]);
  //   // if (this.form.valid) {
  //   console.log(this.form.value);
  //   this.http.put('http://localhost:8080/clinicallocs', this.form.value).subscribe(value => {
  //     this.clinicAllocationService.findAll().subscribe(clinicAllocation => this.loadData(clinicAllocation));
  //   });
  //   this.form.reset();
  //   // }
  //   // else {
  //   //   window.alert("There are some errors in this page");
  //   //
  //   // }
  // }
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
  // search() {
  //   console.log(this.searchForm.value);
  //   if (this.searchForm.value != ""){
  //     this.clinicAllocationService.search(this.searchForm.value).subscribe(clinicAllocation => this.loadData(clinicAllocation));}
  // }

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
    this.touch(["clinicCreation", "employee", "area", "date", "time", "place"]);
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

}
