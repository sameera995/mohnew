import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AreaService} from "../service/area.service";
import {HttpClient} from "@angular/common/http";
import {AreaTypeService} from "../service/area-type.service";
import {Employee} from "../employee/Employee";
import {Area} from "./Area";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private areaService:AreaService,
              private areaTypeService:AreaTypeService,
              private modalService : BsModalService

              ) { }

  private formSubmitAttempt: boolean;

  modalRef:BsModalRef;
  areaForm:FormGroup;
  employees:Employee[];
  areaTypes:string[];
  areas:Area[];

  displayedColumns: string[] = ['name', 'employee', 'areaType', 'action'];
  dataSource: MatTableDataSource<Area>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.formControl();
    this.areaService.findAll().subscribe(area => this.loadData(area));
    this.loadEmployee();
    this.loadAreaType();



  }

  formControl() {
    this.areaForm = this.formBuilder.group({
      'id': null,
      'name': [null, Validators.required],
      'employee': [null, Validators.required],
      'areaType': [null, Validators.required]

    });


  }

  loadEmployee(){
    this.areaService.findEmployee().subscribe(value => {
      console.log(value);
      this.employees = value;
    })
  }

  loadAreaType(){
    this.areaTypeService.findAll().subscribe(value => {
      console.log(value);
      this.areaTypes = value;
    })
  }

  loadData(area: Area[]){
    this.dataSource = new MatTableDataSource(area);
    // this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    this.touch(["name","employee","areaType"]);
    if (this.areaForm.valid) {
      console.log(this.areaForm.value);
      this.http.put('http://localhost:8080/areas', this.areaForm.value).subscribe(value => {
        this.areaService.findAll().subscribe(area => this.loadData(area));
      });
      this.areaForm.reset();
      this.modalRef.hide();
      // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);

    }
    else {
      alert("There are some errors in this page");

    }
  }

  fillForm(area: Area){
    this.areaForm.patchValue({
      'id':area.id,
      'name': area.name,
      'employee': area.employee,
      'areaType': area.areaType
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);
  }

  delete(id:string) {
    console.log(this.areaForm.value);
    this.modalRef.hide();
    this.http.delete('http://localhost:8080/areas/' + id, this.areaForm.value).subscribe(value => {
      this.areaService.findAll().subscribe(area => this.loadData(area));
    });
  }

   touch(controls: string[]) {
    controls.forEach(control => {
      this.areaForm.get(control).markAsTouched({onlySelf: true})
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.areaForm.get(field).valid && this.areaForm.get(field).touched) ||
      (this.areaForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  openModalSave(template: TemplateRef<any>) {
    console.log(this.areaForm);
    this.touch(["name", "employee", "areaType"]);
    if (this.areaForm.valid) {
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

  onClear() {
    this.areaForm.reset();
    this.modalRef.hide();

  }
  compareEmployees = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;

}
