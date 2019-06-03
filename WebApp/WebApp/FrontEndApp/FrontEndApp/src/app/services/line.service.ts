import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, IConductorRequest, ILineRequest,ILine } from './interfaces'
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

    addLine(newLine:ILineRequest){
      let line = newLine;
      this.http.post(this.externalApis.getDataApiHostname() + '/Line/CreateLine/', line).subscribe(
        ok => console.log("kreirana linija"),
        error => console.log("error kreiranje")
      )
      this.refreshLines()
    }


subscriberToLineChanges() : Subject<ILine[]>{
  this.refreshLines()
  return this.lineChanged;
}

refreshLines(){
this.http.get(this.externalApis.getDataApiHostname() + '/line/lines').subscribe((data:ILine[]) =>{
  this.lineChanged.next(data)
})
}
removeLine(lineId : number){
  this.http.delete(this.externalApis.getDataApiHostname() + '/line/removeLine/' + lineId).subscribe(
    ok => this.refreshLines(),
    error => console.log(error)
  )
}
}