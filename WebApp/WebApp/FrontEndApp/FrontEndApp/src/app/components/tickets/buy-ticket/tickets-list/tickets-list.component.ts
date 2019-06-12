import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { AuthService } from 'src/app/services/auth.service';
import { ITicketDefinitionResponse } from 'src/app/services/interfaces';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit, OnDestroy {
  
  public ticketTypes : ITicketDefinitionResponse[]

  constructor(private ticketService : TicketService,
              private authService : AuthService) { }

  ngOnInit() {
    this.ticketService.getAvailableTickets().subscribe((data : ITicketDefinitionResponse[]) => {
      this.ticketTypes = data
    })
  }

  ngOnDestroy(): void {
    
  }
}
