import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }


  onLogout() {
    this.authService.logOut();
  }



}
