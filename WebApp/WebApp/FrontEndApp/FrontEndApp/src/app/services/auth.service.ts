import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from './interfaces'
import { ExternalApisDataService } from './external-apis-data.service';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role : string
  private logginChanged = new Subject<boolean>()

  constructor(private http: HttpClient,
              private externalApisService:ExternalApisDataService){}

  getUserRole() : string {
    return this.role
  }

  getLoginChangeSubscriber() : Subject<boolean>{
    return this.logginChanged
  }

  checkLoggedIn() : boolean{
    if(localStorage.getItem('loggedIn') === "true"){
      this.role = localStorage.getItem('role')
      return true
    }
    return false
  }

  logOut(){
    if(!this.checkLoggedIn()) return

    localStorage.removeItem('loggedIn')
    localStorage.removeItem('jwt')
    localStorage.removeItem('role')

    this.role = ''
    this.logginChanged.next(false)
  }

  logIn(loginData: ILoginData, callback: any){

    if(this.checkLoggedIn()) return

    let data = `grant_type=password&username=${loginData.Email}&password=${loginData.Password}`
    let httpOptions = {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }

    this.http.post<any>(this.externalApisService.getTGSUrl(), data, httpOptions)
    .subscribe(data => {
      
      let jwt = data.access_token;

      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      let role = decodedJwtData.role
      let exp = decodedJwtData.exp

      console.log('jwtData: ' + jwtData)
      console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      console.log('decodedJwtData: ' + decodedJwtData)
      console.log('Role ' + role)

      localStorage.setItem('jwt', jwt)
      localStorage.setItem('role', role);
      localStorage.setItem('loggedIn', "true")
      
      this.role = role
      this.logginChanged.next(true)
    } );
  }
}