import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IConductorRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersChanged = new Subject<IUser[]>()

  constructor(private http:HttpClient,private errorService:ErrorService,
              private externalApis : ExternalApisDataService,
              private router:Router) { }

  subscriberToUserChanges() : Subject<IUser[]>{
      this.refreshUsers()
      return this.usersChanged;
  }

  refreshUsers(){
    this.http.get(this.externalApis.getDataApiUrl() + '/admin/users').subscribe(
      ok => this.usersChanged.next(<IUser[]>ok),
      error => console.log(error)
    )
  }

  addConductor(newConductor : IConductorRequest){
    console.log('dsaidjasio')
    this.http.post(this.externalApis.getDataApiUrl() + '/Account/AddConductor', newConductor).subscribe(
      ok => { this.refreshUsers(); this.router.navigate(['/home', 'users'])},
      error => console.log(error)
    )
  }

  blockUser(userId : number){
    this.http.delete(this.externalApis.getDataApiUrl() + '/admin/blockUser/' + userId).subscribe(
      ok => this.refreshUsers(),
      error => console.log(error)
    )
  }

  unblockUser(userId : number){
    this.http.get(this.externalApis.getDataApiUrl() + '/admin/unblockUser/' + userId).subscribe(
      ok => this.refreshUsers(),
      error => console.log(error)
    )
  }
}
