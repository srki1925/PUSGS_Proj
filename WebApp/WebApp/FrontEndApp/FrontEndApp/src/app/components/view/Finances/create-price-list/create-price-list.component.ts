import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {IPriceListItemRequest, IPriceListRequest,IPriceListItem } from './../../../../services/interfaces';
import { PriceListService } from './../../../../services/price-list.service';
import { Subject } from 'rxjs';
import { PriceListItemService } from './../../../../services/price-list-item.service';
@Component({
  selector: 'app-create-price-list',
  templateUrl: './create-price-list.component.html',
  styleUrls: ['./create-price-list.component.css']
})
export class CreatePriceListComponent implements OnInit {

  constructor(private priceListService: PriceListService,private priceListItemService:PriceListItemService) { }
  public hourItems :IPriceListItem[]
  public dayItems :IPriceListItem[]
  public monthItems :IPriceListItem[]
  public yearItems :IPriceListItem[]
  public priceListForm:FormGroup
  ngOnInit() {
    this.priceListForm = new FormGroup({
      To:new FormControl(null,[Validators.required]),
      From: new FormControl(null,[Validators.required]),
      HourId: new FormControl(null,[Validators.required]),
      DayId:new FormControl(null,[Validators.required]),
      MonthId: new FormControl(null,[Validators.required]),
      YearId: new FormControl(null,[Validators.required])
    })
    this.priceListItemService.subscribeToHourItemsChanged().subscribe((data:IPriceListItem[])=>{
      this.hourItems = data
    }
   )
   this.priceListItemService.subscribeToDayItemsChanged().subscribe((data:IPriceListItem[])=>
   {this.dayItems = data})
   this.priceListItemService.subscribeToMonthItemsChanged().subscribe((data:IPriceListItem[])=>{
     this.monthItems = data
   })
   this.priceListItemService.subscribeToYeartemsChanged().subscribe((data:IPriceListItem[])=>
   { this.yearItems = data})

  }

  onSubmit(){
    if(this.priceListForm.valid){
      let priceList:IPriceListRequest ={
        To:this.priceListForm.value.To,
        From:this.priceListForm.value.From,
        PriceListItems:[this.priceListForm.value.HourId,this.priceListForm.value.DayId,this.priceListForm.value.MonthId,this.priceListForm.value.YearId]
      }
      this.priceListService.createPriceList(priceList)
    }
  }
}
