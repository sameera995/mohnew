import {Component} from '@angular/core';
import {setTheme} from "ngx-bootstrap";
import {AuthenticationService} from "./auth/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
    setTheme('bs4');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }
}
