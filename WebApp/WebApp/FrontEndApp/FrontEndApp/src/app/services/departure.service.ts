import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDeparture,IDepartureRequest} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepartureService {

  constructor(private http:HttpClient,private errorService:ErrorService,private router:Router
    ,private externalApis : ExternalApisDataService) { }
    private departuresChanged = new Subject<IDeparture[]>()


    addDeparture(newDeparture:IDepartureRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/departure/createdeparture',newDeparture).subscribe(
      ok => this.refreshDepartures()
      )
    }
    subscriberToDepartureChanges():Subject<IDeparture[]>{
      this.refreshDepartures()
      return this.departuresChanged;
    }

    refreshDepartures(){
      this.http.get(this.externalApis.getDataApiUrl() + '/departure/departures').subscribe((data:IDeparture[])=>{this.departuresChanged.next(data)})
    }

    removeDeparture(departureId:number){
      this.http.delete(this.externalApis.getDataApiUrl() + '/departure/removedeparture/'+departureId).subscribe(
        ok => this.refreshDepartures(),
        error => {
          this.errorService.setMessage('404 NotFound')
          this.router.navigate(['home','error'])
        }
      )
    }
}
