import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData, IPriceListItem, IPriceListItemRequest } from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class PriceListItemService {

  constructor(private http:HttpClient,
    private externalApis:ExternalApisDataService) { }
    private priceListItemsChanged = new  Subject<IPriceListItem[]>()
    private priceLsitItems = new Subject<IPriceListItem[]>()
    private HourItemChanged = new  Subject<IPriceListItem[]>()
    private DayItemChanged = new  Subject<IPriceListItem[]>()
    private MothItemChanged = new  Subject<IPriceListItem[]>()
    private YearItemChanged = new  Subject<IPriceListItem[]>()
    refreshItems(){
      this.http.get(this.externalApis.getDataApiHostname() + '/pricelistitem/pricelistitems').subscribe(
        (data: IPriceListItem[])=> { this.priceListItemsChanged.next(data);}
      )
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
      this.http.get(this.externalApis.getDataApiHostname() + '/pricelistitem/pricelistitems/'+ 0).subscribe((data:IPriceListItem[])=>{this.HourItemChanged.next(data)})    
    }
    refreshDayItems(){
      this.http.get(this.externalApis.getDataApiHostname() + '/pricelistitem/pricelistitems/'+ 1).subscribe((data:IPriceListItem[])=>{this.DayItemChanged.next(data)})    
    }
    refreshMonthItems(){
      this.http.get(this.externalApis.getDataApiHostname() + '/pricelistitem/pricelistitems/'+ 2).subscribe((data:IPriceListItem[])=>{this.MothItemChanged.next(data)})    
    }
    refreshYearItems(){
      this.http.get(this.externalApis.getDataApiHostname() + '/pricelistitem/pricelistitems/'+ 3).subscribe((data:IPriceListItem[])=>{this.YearItemChanged.next(data)})    
    }

    subscribeToItemsChanged():Subject<IPriceListItem[]>{
      this.refreshItems()
      return this.priceListItemsChanged;
    }
    createPriceListItem(item:IPriceListItemRequest){
      this.http.post(this.externalApis.getDataApiHostname() + '/pricelistitem/createpricelistitem',item).subscribe(
        ok => this.refreshItems(),
        error=> console.log('There is no such type of ticket type')
      )
    }

    removePriceListItem(id:number){
      this.http.delete(this.externalApis.getDataApiHostname()+ '/pricelistitem/removepricelistitem/'+ id).subscribe(
        ok => this.refreshItems(),
        error => console.log('There is no PriceListItem with that id')
      )
    }
}
