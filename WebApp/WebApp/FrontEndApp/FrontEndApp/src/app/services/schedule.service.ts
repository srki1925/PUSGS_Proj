import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IScheduleRequest,ILine, IPriceList, IDeparture} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient,
    private externalApis:ExternalApisDataService) { }

    private lines = new Subject<ILine[]>()
    private departures = new Subject<IDeparture[]>()
    subscribeToLinesChanged(lineType:number){
      this.getLines(lineType)
      return this.lines
    }
    getLines(lineType:number){
        this.http.get(this.externalApis.getDataApiUrl() + '/schedule/lines/'+lineType).subscribe(
            ok => this.lines.next(<ILine[]>ok),
            error => console.log(error)
        )
    }

    subscribeToDepartures(scheduleReqest:IScheduleRequest){
      this.getDepartures(scheduleReqest)
      return this.departures
    }
    getDepartures(scheduleRequest:IScheduleRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/schedule/departures',scheduleRequest).subscribe(
        ok => this.departures.next(<IDeparture[]>ok),
        error => console.log(error)
      )
    }
}
