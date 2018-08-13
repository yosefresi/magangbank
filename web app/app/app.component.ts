import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini Internet Banking';
  isLoggedIn = false;

  constructor(private loginService: LoginService) {
  }

  login(): void {
    this.isLoggedIn = this.loginService.login();
  }
}
