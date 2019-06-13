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

  ngOnInit() {
    this.priceListService.subscribeToListChanged().subscribe((data:IPriceList[])=>{
      this.list =data;
    })
  }

  onRemove(id:number){

      this.priceListService.removePriceList(id)

  }
}
