import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalApisDataService {
  
  private readonly base_url = "http://localhost:52295"

  constructor() { }

  getDataApiUrl() : string{
    return this.base_url + '/api';
  }

  getTGSUrl() : string{
    return this.base_url + '/oauth/token'
  }
}
