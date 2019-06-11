import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRegistrationRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient,
    private externalApis: ExternalApisDataService ) { }
    
    register(passenger:IRegistrationRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/Account/Register',passenger).subscribe(
        error => console.log(error)       
      )
    }
}
