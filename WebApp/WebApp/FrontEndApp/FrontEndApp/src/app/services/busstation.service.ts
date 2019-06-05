import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBusStation,IBusStationRequest} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class BusstationService {

  constructor(private http:HttpClient,
    private externalApis : ExternalApisDataService) { }
    private busStationsChanged = new Subject<IBusStation[]>()

    addBusStation(newBusStation:IBusStationRequest){
      let line = newBusStation;
      this.http.post(this.externalApis.getDataApiHostname() + '/busstation/createbusstation/', line).subscribe(
        ok => console.log("statnica kreirana"),
        error => console.log("error kreiranje")
      )

    }


subscriberToBusChanges() : Subject<IBusStation[]>{
  this.refreshBusStations()
  return this.busStationsChanged;
}

refreshBusStations(){
this.http.get(this.externalApis.getDataApiHostname() + '/busstation/busstations/').subscribe((data:IBusStation[]) =>{
  this.busStationsChanged.next(data)
})
}
removeBusStation(busstationId : number){
  this.http.delete(this.externalApis.getDataApiHostname() + '/busstation/removebusstation/' + busstationId).subscribe(
    ok => this.refreshBusStations(),
    error => console.log(error)
  )
}


}
