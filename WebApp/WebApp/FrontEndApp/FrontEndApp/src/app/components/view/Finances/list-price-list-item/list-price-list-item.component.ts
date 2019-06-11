import { Component, OnInit } from '@angular/core';
import { IPriceListItem, TicketType } from './../../../../services/interfaces'
import { PriceListItemService } from './../../../../services/price-list-item.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-price-list-item',
  templateUrl: './list-price-list-item.component.html',
  styleUrls: ['./list-price-list-item.component.css']
})
export class ListPriceListItemComponent implements OnInit {
public items:IPriceListItem[]
public blockForm:FormGroup
  constructor(private itemService:PriceListItemService) { }

  ngOnInit() {
    this.blockForm = new FormGroup({
      ItemId: new FormControl(null,[Validators.required])
    })
    this.itemService.subscribeToItemsChanged().subscribe((data:IPriceListItem[])=>{
      this.items = data;
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

  onBlock(){
    if(this.blockForm.valid){
      this.itemService.removePriceListItem(this.blockForm.value.ItemId)
    }
  }
}
