import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IConductorRequest, ILineRequest,ILine, IStationLineRequest, IBusStation, ILineUpdateRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http:HttpClient,
    private externalApis : ExternalApisDataService) { }
    private lineChanged = new Subject<ILine[]>()
    private stations = new Subject<IBusStation[]>()
    private line = new Subject<ILine>()
    addLine(newLine:ILineRequest){
      let line = newLine;
      this.http.post(this.externalApis.getDataApiUrl() + '/Line/CreateLine/', line).subscribe(
        ok => this.refreshLines(),
        error => console.log("error kreiranje")
      )
      this.refreshLines()
    }


    getstations(Id:number){
        this.http.get(this.externalApis.getDataApiUrl() + '/line/getstations/'+Id).subscribe(
          ok => this.stations.next(<IBusStation[]>ok),
          error => console.log(error)
        )
    }
    subscrberToBusStations(Id:number){
      this.getstations(Id)
      return this.stations
    }

subscriberToLineChanges() : Subject<ILine[]>{
  this.refreshLines()
  return this.lineChanged;
}

refreshLines(){
this.http.get(this.externalApis.getDataApiUrl() + '/line/lines').subscribe((data:ILine[]) =>{
  this.lineChanged.next(data)
})
}
removeLine(lineId : number){
  this.http.delete(this.externalApis.getDataApiUrl() + '/line/removeLine/' + lineId).subscribe(
    ok => this.refreshLines(),
    error => console.log(error)
  )
}

addStation(request:IStationLineRequest){
  this.http.post(this.externalApis.getDataApiUrl() + '/line/addstation/',request).subscribe(
    error => console.log(error)
  )
}
  removeStation(request:IStationLineRequest){
    this.http.post(this.externalApis.getDataApiUrl()+ '/line/RemoveStation',request).subscribe(
      ok => this.getstations(request.LineId),
      error => console.log(error)
    )
  }

  subToGetLine(id:number):Subject<ILine>{
    this.getLine(id)
    return this.line
  }
  getLine(id:number){
    this.http.get(this.externalApis.getDataApiUrl() + '/line/getline/'+ id).subscribe(
      ok => this.line.next(<ILine>ok),
      error => console.log(error)
    )
  }
  updateLine(line:ILineUpdateRequest){
    this.http.put(this.externalApis.getDataApiUrl() + '/line/update/',line).subscribe(
      ok => this.refreshLines(),
      error => console.log(error)
    )
  }

}