import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonTypeService} from "../../service/person-type.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignCreationService} from "../../service/campaign-creation.service";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {CampaignCreation} from "./CampaignCreation";

@Component({
  selector: 'app-campaign-creation',
  templateUrl: './campaign-creation.component.html',
  styleUrls: ['./campaign-creation.component.css']
})
export class CampaignCreationComponent implements OnInit {

  constructor(private campaignCreationService:CampaignCreationService,
              private personTypeService:PersonTypeService,
              private http:HttpClient,
              private formBuilder: FormBuilder) {}

  private formSubmitAttempt:boolean;
  
  form:FormGroup;

  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<CampaignCreation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.createForm();
    this.campaignCreationService.findAll().subscribe(campaignCreation => this.loadData(campaignCreation));

  }

  createForm(){
    this.form = this.formBuilder.group({

      'id':null,
      'name': [null, Validators.required],
      'description':null
    });
  }

  loadData(campaignCreation: CampaignCreation[]){
    this.dataSource = new MatTableDataSource(campaignCreation);
    this.dataSource.paginator = this.paginator;
  }
  
  onSubmit() {
    this.touch(["name"]);
    if (this.form.valid) {
      console.log(this.form.value);
      this.http.put('http://localhost:8080/campaigncreations', this.form.value).subscribe(value => {
        this.campaignCreationService.findAll().subscribe(campaignCreation => this.loadData(campaignCreation));
      });
      this.form.reset();
      // alert(`Thanks for submitting! Data: ${JSON.stringify(this.employees)}`);

    }
    else {
      alert("There are some errors in this page");

    }
  }

  delete(id:string) {
    console.log(this.form.value);
    this.http.delete('http://localhost:8080/campaigncreations/' + id, this.form.value).subscribe(value => {
      this.campaignCreationService.findAll().subscribe(campaignCreation => this.loadData(campaignCreation));
    });
  }

  fillForm(campaignCreation: CampaignCreation){
    this.form.patchValue({
      'id':campaignCreation.id,
      'name': campaignCreation.name,
      'description':campaignCreation.description
    });
    // alert(`Thanks for submitting! Data: ${JSON.stringify(this.campaign)}`);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  touch(controls: string[]) {
    controls.forEach(control => {
      this.form.get(control).markAsTouched({onlySelf: true})
    });
  }
  
}
