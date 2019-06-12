import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ITicketDefinitionResponse, IRegularTicketRequest } from 'src/app/services/interfaces';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  public buyTicketForm : FormGroup
  public ticketItems : ITicketDefinitionResponse[]
  public loggedIn : boolean

  constructor(private authService : AuthService,
              private ticketService : TicketService) { }

  ngOnInit() {
    this.loggedIn = this.authService.checkLoggedIn()
    this.ticketService.getAvailableTickets().subscribe((data : ITicketDefinitionResponse[]) =>{
      this.ticketItems = data
    })

    this.buyTicketForm = new FormGroup(
      {
        TicketId : new FormControl(null, [Validators.nullValidator]),
        Email : new FormControl(null)
      })
  }

  onSubmit(){
    if(!this.loggedIn && (this.buyTicketForm.value.Email === null || this.buyTicketForm.value.Email === undefined))
      return
    if(!this.buyTicketForm.valid) return

    if(this.loggedIn){
      this.ticketService.buyTicket(this.buyTicketForm.value.TicketId)
    }
    else{
      let data : IRegularTicketRequest = {
        Email : this.buyTicketForm.value.Email,
        TicketDefinitionId : this.buyTicketForm.value.TicketId
      }
      this.ticketService.buyRegularTicket(data)
    }
  }
}
