import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
import { STATUS_CODES } from 'http';
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

  accept(id:number){
    this.http.delete(this.externalApis.getDataApiUrl() + '/conductor/accept/' + id).subscribe(
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
