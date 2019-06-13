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

  constructor(private router:Router,private http:HttpClient,private errorService:ErrorService,
              private externalApis : ExternalApisDataService) { }

  subscriberToUserChanges() : Subject<IUser[]>{
      this.refreshUsers()
      return this.usersChanged;
  }

  refreshUsers(){
    this.http.get(this.externalApis.getDataApiUrl() + '/admin/users').subscribe((data:IUser[]) =>{
      this.usersChanged.next(data)
    })
  }

  addConductor(newConductor : IConductorRequest){

    this.http.post(this.externalApis.getDataApiUrl() + '/Account/AddConductor', newConductor).subscribe(
      ok => { this.refreshUsers(); this.router.navigate(['home']) },
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
