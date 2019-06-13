import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRegistrationRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient,
    private externalApis: ExternalApisDataService,
    private router : Router,
    private errorService : ErrorService) { }
    
    register(passenger:IRegistrationRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/Account/Register',passenger).subscribe(
        ok => this.router.navigate(['/login']),
        error => {this.errorService.setMessage(error.error.Message); this.router.navigate(['/home', 'error'])}      
      )
        this.router.navigate(['login'])
    }
}
