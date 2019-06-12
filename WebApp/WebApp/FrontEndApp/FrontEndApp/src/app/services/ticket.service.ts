import { Injectable } from '@angular/core';
import { ExternalApisDataService } from './external-apis-data.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private externalApis : ExternalApisDataService) { }

  getAllTickets(){
    
  }
}
