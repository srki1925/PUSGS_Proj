import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDeparture,IDepartureRequest} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
//TO DO
//List ima ispisano Id(za brisanje),Time,Tip i LineName i LinaType
//Create ima ponudjenu listu Linija gde je prikazano LineName i LineType i unosi LineName(na osnovu name sa find pronalazimo LineId i saljemo)
@Injectable({
  providedIn: 'root'
})
export class DepartureService {

  constructor(private http:HttpClient,
    private externalApis : ExternalApisDataService) { }
    private departuresChanged = new Subject<IDeparture[]>()


    addDeparture(newDeparture:IDepartureRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/departure/createdeparture',newDeparture).subscribe(
      ok => console.log("polazak kreiran"),
      error => console.log("error polazak ")
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
        error => console.log(error)
      )
    }
}
