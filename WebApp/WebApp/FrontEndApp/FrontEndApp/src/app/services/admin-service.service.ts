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
    this.http.get(this.externalApis.getDataApiUrl() + '/admin/users').subscribe((data:IUser[]) =>{
      this.usersChanged.next(data)
    })
  }

  addConductor(newConductor : IConductorRequest){
    console.log('dsaidjasio')
    this.http.post(this.externalApis.getDataApiUrl() + '/Account/AddConductor', newConductor).subscribe(
      ok => this.refreshUsers(),
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
