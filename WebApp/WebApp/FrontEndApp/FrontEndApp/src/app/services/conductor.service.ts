import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private activationListChanged = new Subject<IActivationData[]>()

  constructor(private http: HttpClient,
    private externalApis: ExternalApisDataService) { }

  refreshList(){
    this.http.get(this.externalApis.getDataApiHostname() + '/passenger/activationlist').subscribe((data: IActivationData[])=>{
      this.activationListChanged.next(data)
    })
  }

  subscribeToListChanged():Subject<IActivationData[]>{
    this.refreshList();
    return this.activationListChanged;
  }

  accept(id:number){
    this.http.delete(this.externalApis.getDataApiHostname() + '/conductor/accept/'+id).subscribe(
      error => console.log(error)
    )
  }
}
