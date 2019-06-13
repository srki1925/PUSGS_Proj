import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData, IPriceListItem, IPriceListItemRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PriceListItemService {

  constructor(private http:HttpClient,private errorService:ErrorService,private router:Router,
    private externalApis:ExternalApisDataService) { }
    private priceListItemsChanged = new  Subject<IPriceListItem[]>()
    private priceLsitItems = new Subject<IPriceListItem[]>()
    private HourItemChanged = new  Subject<IPriceListItem[]>()
    private DayItemChanged = new  Subject<IPriceListItem[]>()
    private MothItemChanged = new  Subject<IPriceListItem[]>()
    private YearItemChanged = new  Subject<IPriceListItem[]>()
    refreshItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems').subscribe(
        (data: IPriceListItem[])=> { this.priceListItemsChanged.next(data);}
      )
    }

    getAllPriceItemsForType(ticketType:number){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ ticketType).subscribe((data:IPriceListItem[])=>{this.priceLsitItems.next(data)})
    }
    subscribeToHourItemsChanged():Subject<IPriceListItem[]>{
      this.refreshHourItems()
      return this.HourItemChanged;
    }
    subscribeToDayItemsChanged():Subject<IPriceListItem[]>{
      this.refreshDayItems()
      return this.DayItemChanged;
    }
    subscribeToMonthItemsChanged():Subject<IPriceListItem[]>{
      this.refreshMonthItems()
      return this.MothItemChanged;
    }
    subscribeToYeartemsChanged():Subject<IPriceListItem[]>{
      this.refreshYearItems()
      return this.YearItemChanged;
    }
    refreshHourItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ 0).subscribe((data:IPriceListItem[])=>{this.HourItemChanged.next(data)})    
    }
    refreshDayItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ 1).subscribe((data:IPriceListItem[])=>{this.DayItemChanged.next(data)})    
    }
    refreshMonthItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ 2).subscribe((data:IPriceListItem[])=>{this.MothItemChanged.next(data)})    
    }
    refreshYearItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ 3).subscribe((data:IPriceListItem[])=>{this.YearItemChanged.next(data)})    
    }

    subscribeToItemsChanged():Subject<IPriceListItem[]>{
      this.refreshItems()
      return this.priceListItemsChanged;
    }
    createPriceListItem(item:IPriceListItemRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/pricelistitem/createpricelistitem',item).subscribe(
        ok => this.refreshItems(),
        error=> {
          this.errorService.setMessage('404 NotFound')
          this.router.navigate(['home','error'])
        }
      )
    }

    removePriceListItem(id:number){
      this.http.delete(this.externalApis.getDataApiUrl()+ '/pricelistitem/removepricelistitem/'+ id).subscribe(
        ok => this.refreshItems(),
        error => {
          this.errorService.setMessage('404 NotFound')
          this.router.navigate(['home','error'])
        }
      )
    }
}
