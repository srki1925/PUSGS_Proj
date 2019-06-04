import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IConductorRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersChanged = new Subject<IUser[]>()

  constructor(private http:HttpClient,
              private externalApis : ExternalApisDataService) { }

  subscriberToUserChanges() : Subject<IUser[]>{
      this.refreshUsers()
      return this.usersChanged;
  }

  refreshUsers(){
    this.http.get(this.externalApis.getDataApiHostname() + '/admin/users').subscribe((data:IUser[]) =>{
      this.usersChanged.next(data)
    })
  }

  addConductor(newConductor : IConductorRequest){
    this.http.post(this.externalApis.getDataApiHostname() + '/admin/createConductor/', newConductor).subscribe(
      ok => this.refreshUsers(),
      error => console.log(error)
    )
  }

  blockUser(userId : number){
    this.http.delete(this.externalApis.getDataApiHostname() + '/admin/blockUser/' + userId).subscribe(
      ok => this.refreshUsers(),
      error => console.log(error)
    )
  }

  unblockUser(userId : number){
    this.http.get(this.externalApis.getDataApiHostname() + '/admin/unblockUser/' + userId).subscribe(
      ok => this.refreshUsers(),
      error => console.log(error)
    )
  }
}