import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";
import {Person} from "../person/Person";
import {MatTableDataSource} from "@angular/material";
import {Area} from "../area/Area";
import {AreaService} from "../service/area.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,
              private fb : FormBuilder,
              private modalService : BsModalService,
              private http:HttpClient,
              private areaService:AreaService) { }

  private formSubmitAttempt :boolean;

  form:FormGroup;
  modalRef:BsModalRef;
  areas:Area[];


  ngOnInit() {
    this.formControl();
    this.loadArea();
  }

  formControl() {
    this.form= this.fb.group({
      'id': null,
      'name': [null, Validators.required],
      'nic': [null, Validators.required],
      'address': [null, Validators.required],
      'contact': [null, Validators.required],
      'area': [null, Validators.required],
      'subject': [null, Validators.required],
      'complain': [null, Validators.required]
    });
  }

  loadArea(){
    this.areaService.findAll().subscribe(value => {
      this.areas = value;})
  }

  onSubmit(){
    this.modalRef.hide();

    console.log(this.form.value);
    this.http.put('http://localhost:8080/complains', this.form.value).subscribe()
    this.form.reset();
  }

  onClear(){
    this.modalRef.hide();
    this.form.reset();
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
