import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private activationListChanged = new Subject<IActivationData[]>()
  private validationMessage = new Subject<string>();

  constructor(private http: HttpClient,
              private externalApis: ExternalApisDataService) { }

  refreshList(){
    this.http.get(this.externalApis.getDataApiUrl() + '/passenger/activationlist').subscribe((data: IActivationData[])=>{
      this.activationListChanged.next(data)
    })
  }

  subscribeToListChanged():Subject<IActivationData[]>{
    this.refreshList();
    return this.activationListChanged;
  }

  accept(id:string){
    let data = {
      Email : id
    }
    this.http.post(this.externalApis.getDataApiUrl() + '/Conductor/Accept', data).subscribe(
      ok => this.refreshList(),
      error => console.log(error)
    )
  }

  deny(email : string){
    let data = {
      Email : email
    }
    this.http.post(this.externalApis.getDataApiUrl() + '/Conductor/Refuse', data ).subscribe(
      ok => this.refreshList(),
      error => console.log(error)
    )
  }

  subscriberToValidationMessages() : Subject<string>{
    return this.validationMessage
  }

  validateTicket(id : number){
    this.http.get(this.externalApis.getDataApiUrl() + '/conductor/validate/' + id).subscribe(
      ok => this.validationMessage.next(<string>ok),
      error => {
        if(error.status == 404) this.validationMessage.next('Ticket not found')
      }
    )
  }
}
