import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IActivationData, IPriceListItem } from './interfaces'
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

    refreshItems(){
      this.http.get(this.externalApis.getDataApiHostname() + 'api/pricelistitem/pricelistitems').subscribe(
        (data: IPriceListItem[])=> { this.priceListItemsChanged.next(data);}
      )
    }

    subscribeToItemsChanged():Subject<IPriceListItem[]>{
      this.refreshItems()
      return this.priceListItemsChanged;
    }
    createPriceListItem(item:IPriceListItem){
      this.http.post(this.externalApis.getDataApiHostname() + 'api/pricelistitem/createpricelistitem',item).subscribe(
        ok => this.refreshItems(),
        error=> console.log('There is no such type of ticket type')
      )
    }

    removePriceListItem(id:number){
      this.http.delete(this.externalApis.getDataApiHostname()+ 'api/pricelistitem/removepricelistitem/'+ id).subscribe(
        ok => this.refreshItems(),
        error => console.log('There is no PriceListItem with that id')
      )
    }
}
