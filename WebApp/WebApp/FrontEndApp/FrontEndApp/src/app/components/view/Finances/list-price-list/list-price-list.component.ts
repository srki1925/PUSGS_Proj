import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {IPriceList } from './../../../../services/interfaces';
import { PriceListService } from './../../../../services/price-list.service';

@Component({
  selector: 'app-list-price-list',
  templateUrl: './list-price-list.component.html',
  styleUrls: ['./list-price-list.component.css']
})
export class ListPriceListComponent implements OnInit {

  constructor(private priceListService:PriceListService) { }

  public list:IPriceList[]
  public blockForm:FormGroup
  ngOnInit() {
    this.blockForm = new FormGroup({
      ListId: new FormControl(null,[Validators.required])
    })

    this.priceListService.subscribeToListChanged().subscribe((data:IPriceList[])=>{
      this.list =data;
    })
  }

  onBlock(){
    if(this.blockForm.valid){
      this.priceListService.removePriceList(this.blockForm.value.ListId)
    }
  }
}
