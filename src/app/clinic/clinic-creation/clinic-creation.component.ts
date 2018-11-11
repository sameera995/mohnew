import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClinicCreation} from "./ClinicCreation";
import {ClinicCreationService} from "../../service/clinic-creation.service";
import {PersonTypeService} from "../../service/person-type.service";
import {Area} from "../../area/Area";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-clinic-creation',
  templateUrl: './clinic-creation.component.html',
  styleUrls: ['./clinic-creation.component.css']
})
export class ClinicCreationComponent implements OnInit {

  constructor(private clinicCreationService:ClinicCreationService,
              private personTypeService:PersonTypeService,
              private http:HttpClient,
              private formBuilder: FormBuilder) {}

  private formSubmitAttempt:boolean;

  clinicCreationForm:FormGroup;
  clinicCreations:ClinicCreation[];
  personTypes:string[];
  clinicTypes:string[];

  displayedColumns: string[] = ['name', 'clinicType', 'personType', 'action'];
  dataSource: MatTableDataSource<ClinicCreation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.createForm();
    this.clinicCreationService.findAll().subscribe(clinicCreation => this.loadData(clinicCreation));
    this.loadClinicType();
    this.loadPersonType();
    
  }


  createForm(){
    this.clinicCreationForm = this.formBuilder.group({

      'id':null,
      'name': [null, Validators.required],
      'clinicType': [null, Validators.required],
      'personType': [null, Validators.required],
      'description':null
    });
  }

  loadClinicType(){
    this.clinicCreationService.findType().subscribe(value => {
      console.log(value);
      this.clinicTypes = value;
    })
  }

  loadPersonType(){
    this.personTypeService.findAll().subscribe(value => {
      console.log(value);
      this.personTypes = value;
    })
  }

  loadData(clinicCreation: ClinicCreation[]){
    this.dataSource = new MatTableDataSource(clinicCreation);
    // this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    this.touch(["name","clinicType","personType"]);
    if (this.clinicCreationForm.valid) {
      console.log(this.clinicCreationForm.value);
      this.http.put('http://localhost:8080/cliniccreations', this.clinicCreationForm.value).subscribe(value => {
        this.clinicCreationService.findAll().subscribe(clinicCreation => this.loadData(clinicCreation));
      });
      this.clinicCreationForm.reset();
      // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);

    }
    else {
      alert("There are some errors in this page");

    }
  }

  delete(id:string) {
    console.log(this.clinicCreationForm.value);
    this.http.delete('http://localhost:8080/cliniccreations/' + id, this.clinicCreationForm.value).subscribe(value => {
      this.clinicCreationService.findAll().subscribe(clinicCreation => this.loadData(clinicCreation));
    });
  }

  fillForm(clinicCreation: ClinicCreation){
    this.clinicCreationForm.patchValue({
      'id':clinicCreation.id,
      'name': clinicCreation.name,
      'clinicType':clinicCreation.clinicType,
      'personType':clinicCreation.personType,
      'description':clinicCreation.description
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.clinic)}`);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.clinicCreationForm.get(field).valid && this.clinicCreationForm.get(field).touched) ||
      (this.clinicCreationForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.clinicCreationForm.get(control).markAsTouched({onlySelf: true})
    });
  }

  compareClinicType = (o1: any, o2: any) => o1 === o2;

}
