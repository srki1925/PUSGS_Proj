import { Component, OnInit } from '@angular/core';
import { ITicketResponse } from 'src/app/services/interfaces';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  public tickets : ITicketResponse[]
  public hasData = false

  constructor(private ticketService : TicketService) { }

  ngOnInit() {
    this.ticketService.getTicketsForUser().subscribe((data : ITicketResponse[]) =>{
      this.tickets = data
      this.hasData = this.tickets != undefined && this.tickets.length > 0
    })
  }

}
