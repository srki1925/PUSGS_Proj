import { Component, OnInit } from '@angular/core';
import { IPriceList,TicketType, IPriceListItem } from './../../../../../services/interfaces'
import { PriceListService } from './../../../../../services/price-list.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-price-list-details',
  templateUrl: './price-list-details.component.html',
  styleUrls: ['./price-list-details.component.css']
})
export class PriceListDetailsComponent implements OnInit {

  constructor(private priceListService:PriceListService,
      private router:Router,
      private route:ActivatedRoute) { }
  public items:IPriceListItem[]
  private id:number
  ngOnInit() {
      this.route.params.subscribe((params:Params)=>{
        this.id = +params['id'];
        this.priceListService.subscribeToGetList(this.id).subscribe((data:IPriceList)=>
        { 
          this.items = data.PriceListItems
          })

      })

  }

  getTicketTypeString(ticketType:number):string{
    switch(ticketType){
      case TicketType.Hour: return 'Hour'
      case TicketType.Day: return 'Day'
      case TicketType.Month: return 'Month'
      case TicketType.Year: return 'Year'
    }
  }
}
