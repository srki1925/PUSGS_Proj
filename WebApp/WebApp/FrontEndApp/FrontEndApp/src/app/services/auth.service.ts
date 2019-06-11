import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = "http://localhost:52295/oauth/token"
  role : string
  
  constructor(private http: HttpClient) { }

  checkLoggedIn() : boolean{
    let jwt = localStorage.getItem("jwt");
    if(jwt){
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      let role = decodedJwtData.role
    }
    return false
  }

  logIn(loginData: ILoginData, callback: any){
    console.log(loginData.Email + loginData.Password)
    let data = `grant_type=password&username=${loginData.Email}&password=${loginData.Password}`
    let httpOptions = {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }

    this.http.post<any>(this.base_url, data, httpOptions)
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
      callback();
      
    } );
  }
}
