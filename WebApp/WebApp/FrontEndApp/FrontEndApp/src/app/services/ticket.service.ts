import { Injectable } from '@angular/core';
import { ExternalApisDataService } from './external-apis-data.service';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { ITicketDefinitionResponse, ITicketResponse, IRegularTicketRequest } from './interfaces'
import { HttpClient } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsList = new Subject<ITicketDefinitionResponse[]>()
  private usersTickets = new Subject<ITicketResponse[]>()

  constructor(private externalApis : ExternalApisDataService,
              private authService : AuthService,
              private http : HttpClient) { }

  getAvailableTickets(){
    let modifier = this.authService.checkLoggedIn() ? '' : '/regular'
    this.http.get(this.externalApis.getDataApiUrl() + '/Ticket' + modifier).subscribe(
      ok => this.ticketsList.next(<ITicketDefinitionResponse[]>ok),
      error => console.log(error.statusText)
    )

    return this.ticketsList;
  }

  getTicketsForUser(){
    this.http.get(this.externalApis.getDataApiUrl() + "/ticket/alltickets").subscribe(
      ok => this.usersTickets.next(<ITicketResponse[]>ok),
      error => console.log(error.statusText)
    )
    return this.usersTickets;
  }

  buyTicket(id : number){
    this.http.get(this.externalApis.getDataApiUrl() + "/ticket/buy/" + id).subscribe(
      ok => console.log('ok'),
      error => console.log('error')
    )
  }

  buyRegularTicket(ticketRequest : IRegularTicketRequest){
    this.http.post(this.externalApis.getDataApiUrl() + '/ticket/buyRegular', ticketRequest).subscribe(
      ok => console.log('ok'),
      error => console.log('error')
    )
  }
}
