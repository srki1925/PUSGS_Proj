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
    refreshItems(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems').subscribe(
        (data: IPriceListItem[])=> { this.priceListItemsChanged.next(data);}
      )
    }

    getAllPriceItemsForType(ticketType:number){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelistitem/pricelistitems/'+ ticketType).subscribe((data:IPriceListItem[])=>{this.priceLsitItems.next(data)})
    }
    subscribeToItemsChanged():Subject<IPriceListItem[]>{
      this.refreshItems()
      return this.priceListItemsChanged;
    }
    createPriceListItem(item:IPriceListItemRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/pricelistitem/createpricelistitem',item).subscribe(
        ok => this.refreshItems(),
        error=> console.log('There is no such type of ticket type')
      )
    }

    removePriceListItem(id:number){
      this.http.delete(this.externalApis.getDataApiUrl()+ '/pricelistitem/removepricelistitem/'+ id).subscribe(
        ok => this.refreshItems(),
        error => console.log('There is no PriceListItem with that id')
      )
    }
}
