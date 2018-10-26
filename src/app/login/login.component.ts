import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }



  ngOnInit() {
    this.form = this.formBuilder.group({
      'username':[null,Validators.required],
      'password':[null,Validators.required]
    });
  }



  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }



  onSubmit(){
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }



}
