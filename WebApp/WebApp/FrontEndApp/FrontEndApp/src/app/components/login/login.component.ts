import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginData } from 'src/app/services/interfaces';
import { FormGroup, ControlContainer, FormControl, Validators } from '@angular/forms';
import { ValidateTicketComponent } from '../conductor/validate-ticket/validate-ticket.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      Email : new FormControl(null, [Validators.nullValidator, Validators.email]),
      Password : new FormControl(null, [Validators.nullValidator, Validators.minLength(8), Validators.maxLength(16)])
    })
  }

  onSubmit(){
    if(!this.loginForm.valid) return
    this.authService.logIn({ Email : this.loginForm.value.Email, Password: this.loginForm.value.Password})
  }
}
