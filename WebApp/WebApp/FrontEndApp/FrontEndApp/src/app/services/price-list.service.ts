import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IPriceList, IPriceListRequest} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(private http:HttpClient,
    private externalApis:ExternalApisDataService) { }
    private priceListChanged = new  Subject<IPriceList[]>()

    refreshList(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelist/pricelists').subscribe(
        (data: IPriceList[])=> { this.priceListChanged.next(data);}
      )
    }
    
    
    subscribeToListChanged():Subject<IPriceList[]>{
      this.refreshList()
      return this.priceListChanged;
    }



    createPriceList(list:IPriceListRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/pricelist/createpricelist',list).subscribe(
        ok => this.refreshList(),
        error=> console.log('There is no such type of ticket type')
      )
    }
    removePriceList(id:number){
      this.http.delete(this.externalApis.getDataApiUrl()+ '/pricelist/removepricelis/'+ id).subscribe(
        ok => this.refreshList(),
        error => console.log('There is no PriceList with that id')
      )
    }
}
