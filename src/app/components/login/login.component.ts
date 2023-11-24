import { Component } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  control = {
    username: new FormControl(),
    password: new FormControl()

  };

  constructor(private loginService: LoginService){
  }

  login(){
    this.loginService.login(this.control.username.value, this.control.password.value);
  }

}
