import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";
import {PersonTypeService} from "../service/person-type.service";
import {Gender} from "../employee/employee.component";
import {GenderService} from "../service/gender.service";
import {Person} from "./Person";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {PersonService} from "../service/person.service";
import {AreaService} from "../service/area.service";
import {Area} from "../area/Area";

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
    private personTypeService:PersonTypeService,
    private genderService:GenderService,
    private personService:PersonService,
    private areaService:AreaService
  ) { }

  form:FormGroup;
  searchForm:FormGroup;
  personTypes:string[];
  genders:string[];
  areas:Area[];

  modalRef:BsModalRef;

  displayedColumns: string[] = ['name', 'gender', 'address', 'personType','personStatus','action'];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private formSubmitAttempt : boolean;


  ngOnInit(){
    this.formControl();
    this.personService.findAll().subscribe(person => this.loadData(person));
    this.loadGender();
    this.loadPersonTypes();
    this.loadArea();
    // this.form.controls['personStatus'].disable();
    // this.loadPhiArea();
    // this.loadPhmArea();

  }


  formControl() {
    this.form= this.fb.group({
      'id': null,
      'name': [null, Validators.required],
      'gender': [null, Validators.required],
      'dob': [null, Validators.required],
      'address': [null, Validators.required],
      'contact': [null, Validators.required],
      'area': [null, Validators.required],
      'personType': [null, Validators.required],
      'parentName': null,
      'parentOccupation': null,
      'numberOfSiblings': null,
      'personStatus': [null, Validators.required]

    });

    this.searchForm= this.fb.group({
      'name': null,
      // 'area': null
    });
  }

  loadData(person : Person[]){
    this.dataSource = new MatTableDataSource(person);
    this.dataSource.paginator = this.paginator;
  }

  loadPersonTypes(){
    this.personTypeService.findAll().subscribe(value => {
      console.log(value);
      this.personTypes = value
    });
  }

  loadGender(){
    this.genderService.findAll().subscribe(value => {
      console.log(value);
      this.genders = value;})
  }

  // loadPhiArea(){
  //   this.areaService.findAllByAreaType("PHI_Area").subscribe(value => {
  //     this.phiareas = value;})
  // }
  //
  // loadPhmArea(){
  //   this.areaService.findAllByAreaType("PHM_Area").subscribe(value => {
  //     this.phmareas = value;})
  // }

  loadArea(){
    this.areaService.findAll().subscribe(value => {
      this.areas = value;})
  }

  fillForm(person: Person){
    this.form.patchValue({
      'id':person.id,
      'name': person.name,
      'gender': person.gender,
      'dob': person.dob,
      'address': person.address,
      'contact': person.contact,
      'area': person.area,
      'personType': person.personType,
      'parentName': person.parentName,
      'parentOccupation': person.parentOccupation,
      'numberOfSiblings': person.numberOfSiblings,
      'personStatus': person.personStatus
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);
  }

  onSubmit(){
    this.modalRef.hide();
    this.form.patchValue({
      "dob": this.convertDateToString(this.form.get("dob").value)
    });

    console.log(this.form.value);
    this.http.put('http://localhost:8080/persons', this.form.value).subscribe(value => {
      this.personService.findAll().subscribe(person => this.loadData(person));
    });
    this.form.reset();
  }

  onClear(){
    this.modalRef.hide();
    this.form.reset();
  }

  search() {
    console.log(this.searchForm.value);
    if (this.searchForm.value != ""){
      this.personService.search(this.searchForm.value).subscribe(person => this.loadData(person));}
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.form.get(control).markAsTouched({onlySelf: true})
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
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

  openModalSave(template: TemplateRef<any>) {
    // this.touch(["name","gender","dob","address","contact","area","personType","personStatus"]);
    // if (this.form.valid) {
      this.modalRef = this.modalService.show(template);}
    // else {
    //   window.alert("There are some errors in this page");
    // }
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onModelNo(): void {
    this.modalRef.hide();
  }
}
