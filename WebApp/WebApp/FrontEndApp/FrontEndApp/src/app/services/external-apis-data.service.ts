import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalApisDataService {
  private readonly dataServiceHostname = 'http://localhost:52295/api'
  
  constructor() { }

  getDataApiHostname() : string{
    return this.dataServiceHostname;
  }
}
