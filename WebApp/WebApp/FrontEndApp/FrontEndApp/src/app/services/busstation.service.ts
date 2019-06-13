import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBusStation,IBusStationRequest, ILine} from './interfaces'
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
    private stations = new Subject<IBusStation[]>()
    private lines = new Subject<ILine[]>()
    addBusStation(newBusStation:IBusStationRequest){
      let line = newBusStation;
      this.http.post(this.externalApis.getDataApiUrl() + '/busstation/createbusstation/', line).subscribe(
        ok => this.refreshBusStations(),
        error => console.log("error kreiranje")
      )

    }
    subtToLines(id:number){
      this.getLines(id)
      return this.lines
    }
    getLines(id:number){
      this.http.get(this.externalApis.getDataApiUrl() + '/busstation/getlines/'+id).subscribe(
        ok => this.lines.next(<ILine[]>ok),
        error => console.log(error)
      )
    }
    subscriberToFilterBusStations(id:number){
      this.getStationsFilter(id)
      return this.stations
    }

    getStationsFilter(id:number){
      this.http.get(this.externalApis.getDataApiUrl() + '/busstation/busstations/'+id).subscribe(
        ok => this.stations.next(<IBusStation[]>ok),
        error => console.log(error)
      )
    }
subscriberToBusChanges() : Subject<IBusStation[]>{
  this.refreshBusStations()
  return this.busStationsChanged;
}

refreshBusStations(){
this.http.get(this.externalApis.getDataApiUrl() + '/busstation/busstations/').subscribe((data:IBusStation[]) =>{
  this.busStationsChanged.next(data)
})
}
removeBusStation(busstationId : number){
  this.http.delete(this.externalApis.getDataApiUrl() + '/busstation/removebusstation/' + busstationId).subscribe(
    ok => this.refreshBusStations(),
    error => console.log(error)
  )
}


}
