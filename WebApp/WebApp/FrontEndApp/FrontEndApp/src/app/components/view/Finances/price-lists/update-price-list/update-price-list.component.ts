import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {IPriceListItemRequest, IPriceListRequest,IPriceListItem, IPriceList, IPriceListUpdateRequest } from './../../../../../services/interfaces';
import { PriceListService } from './../../../../../services/price-list.service';
import { Subject } from 'rxjs';
import { PriceListItemService } from './../../../../../services/price-list-item.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update-price-list',
  templateUrl: './update-price-list.component.html',
  styleUrls: ['./update-price-list.component.css']
})
export class UpdatePriceListComponent implements OnInit {

  constructor(private priceListService: PriceListService,private priceListItemService:PriceListItemService,
    private router:Router,
    private route:ActivatedRoute) { }
  public hourItems :IPriceListItem[]
  public dayItems :IPriceListItem[]
  public monthItems :IPriceListItem[]
  public yearItems :IPriceListItem[]
  public priceListForm:FormGroup
  private Id:number
  public list:IPriceList
  ngOnInit() {
    this.priceListForm = new FormGroup({
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

    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id']
      this.priceListService.subscribeToGetList(this.Id).subscribe((data:IPriceList)=>{
        this.list = data
        console.log(data)
        this.priceListForm.patchValue({
          HourId:this.list.PriceListItems[0].Id,
          DayId:this.list.PriceListItems[1].Id,
          MonthId:this.list.PriceListItems[2].Id,
          YearId:this.list.PriceListItems[3].Id
        })
      })
      
    })
  }
  onSubmit(){
    if(this.priceListForm.valid){
      console.log('valid')
      let priceList:IPriceListUpdateRequest ={
        Id:this.Id,
        PriceListItems:[this.priceListForm.value.HourId,this.priceListForm.value.DayId,this.priceListForm.value.MonthId,this.priceListForm.value.YearId]
      }
      this.priceListService.updatePriceList(priceList)
    }
  }
}
