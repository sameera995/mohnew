import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Login} from "../login/Login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) { }

  login(user: Login) {
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/main']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

}
