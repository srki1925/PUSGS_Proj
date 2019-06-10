import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IPriceListItem } from './../../../../services/interfaces';
import { PriceListItemService } from './../../../../services/price-list-item.service';

@Component({
  selector: 'app-create-price-list-item',
  templateUrl: './create-price-list-item.component.html',
  styleUrls: ['./create-price-list-item.component.css']
})
export class CreatePriceListItemComponent implements OnInit {

  constructor(private priceListItemService: PriceListItemService) { }
  public priceListItemForm:FormGroup
  ngOnInit() {
    this.priceListItemForm = new FormGroup({
      Price: new FormControl("",[Validators.required,Validators.nullValidator]),
      TicketType: new FormControl("",[Validators.required,Validators.nullValidator]),
         });
  }
  onSubmit(){
    if(this.priceListItemForm.valid){
    let item:IPriceListItem = {
      Price:this.priceListItemForm.value.Price,
      TicketType:this.priceListItemForm.value.TicketType,
    }
    this.priceListItemService.createPriceListItem(item);
  }
}
}
