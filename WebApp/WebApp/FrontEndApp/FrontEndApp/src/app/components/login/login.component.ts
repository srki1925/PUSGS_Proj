import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginData } from 'src/app/services/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let loginData : ILoginData = {
      Email : 'admin@yahoo.com',
      Password : 'Admin123!'
    }

    //if(!this.authService.checkLoggedIn){

      this.authService.logIn(loginData, () =>{
        console.log('Finished login')
      });
    //}
  }

}
