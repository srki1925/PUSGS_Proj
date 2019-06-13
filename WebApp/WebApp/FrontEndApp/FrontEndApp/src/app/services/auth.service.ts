import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginData, IPasswordChangeRequest, IUserProfileResponse, IUser } from './interfaces'
import { ExternalApisDataService } from './external-apis-data.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role : string
  private logginChanged = new Subject<boolean>()
  private userDataChanged = new Subject<IUserProfileResponse>()
  private userStateChanged = new Subject<string>();
  private userState : string = '';

  constructor(private http: HttpClient,
              private externalApisService:ExternalApisDataService,
              private router:Router){}

  getUserRole() : string {
    return localStorage.getItem('role')
  }

  getLoginChangeSubscriber() : Subject<boolean>{
    return this.logginChanged
  }

  checkLoggedIn() : boolean{
    if(localStorage.getItem('loggedIn') === "true"){
      this.role = localStorage.getItem('role')
      if(this.role === 'Passenger'){
        this.fetchUserState()
      }
      return true
    }
    return false
  }

  fetchUserState(){
    this.http.get(this.externalApisService.getDataApiUrl() + '/Account/state').subscribe(
      ok => { this.userState = <string>ok; this.userStateChanged.next(this.userState)},
      error => console.log(error)
      )
  }

  getUserState() : string{
    return this.userState;
  }

  subscriberToUserState() : Subject<string>{
    return this.userStateChanged;
  }

  changePassword(data : IPasswordChangeRequest){
    this.http.post(this.externalApisService.getDataApiUrl() + '/Account/ChangePassword', data).subscribe(
      ok => this.router.navigate(['home']),
      error => console.log(error)
    )
  }

  getUserData(){
    this.http.get(this.externalApisService.getDataApiUrl() + '/Account/UserData').subscribe(
      ok => this.userDataChanged.next(<IUserProfileResponse>ok),
      error => console.log(error.status)
    )
  }

  updateUser(user : IUserProfileResponse){
    this.http.post(this.externalApisService.getDataApiUrl() + '/Account/Update', user).subscribe(
      ok => { this.getUserData(); this.router.navigate(['/user-profile']) },
      error => console.log(error.status)
    )
  }

  subscribeToUserDataChanges(){
    return this.userDataChanged;
  }

  logOut(){
    if(!this.checkLoggedIn()) return

    localStorage.removeItem('loggedIn')
    localStorage.removeItem('jwt')
    localStorage.removeItem('role')

    this.role = ''
    this.logginChanged.next(false)
  }

  logIn(loginData: ILoginData){

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

      // console.log('jwtData: ' + jwtData)
      // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      // console.log('decodedJwtData: ' + decodedJwtData)
      // console.log('Role ' + role)

      if(role === 'Passenger'){
        this.getUserState()
      }

      localStorage.setItem('jwt', jwt)
      localStorage.setItem('role', role);
      localStorage.setItem('loggedIn', "true")
      
      this.role = role
      this.logginChanged.next(true)
      this.router.navigate(['home'])
    } );
  }
}