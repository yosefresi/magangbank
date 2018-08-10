import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  constructor() { }

  login(): boolean {
    // TODO login function
    return true;
  }

}
