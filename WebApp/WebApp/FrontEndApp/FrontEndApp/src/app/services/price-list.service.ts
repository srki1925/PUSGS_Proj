import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IPriceList, IPriceListRequest, IPriceListUpdateRequest} from './interfaces'
import { Subject } from 'rxjs';
import { ExternalApisDataService } from './external-apis-data.service'
import { ok } from 'assert';
import { error } from '@angular/compiler/src/util';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(private http:HttpClient,private errorService:ErrorService,private router:Router,
    private externalApis:ExternalApisDataService) { }
    private priceListChanged = new  Subject<IPriceList[]>()
    private list = new Subject<IPriceList>()
    refreshList(){
      this.http.get(this.externalApis.getDataApiUrl() + '/pricelist/pricelists').subscribe(
        (data: IPriceList[])=> { this.priceListChanged.next(data);}
      )
    }
    
    
    subscribeToListChanged():Subject<IPriceList[]>{
      this.refreshList()
      return this.priceListChanged;
    }
    subscribeToGetList(id:number){
      this.getList(id)
      return this.list
    }

    getList(id:number){
        this.http.get(this.externalApis.getDataApiUrl() + '/pricelist/'+id).subscribe(
          ok => this.list.next(<IPriceList>ok),
          error => {
            this.errorService.setMessage('404 NotFound')
            this.router.navigate(['home','error'])
          }
        
        )
        
    }

    updatePriceList(list:IPriceListUpdateRequest){
      this.http.put(this.externalApis.getDataApiUrl() + '/pricelist/update/',list).subscribe(
        ok => this.refreshList(),
        error => {
          if(error.status === 404){

            this.errorService.setMessage('404 NotFound')
          }else{
            this.errorService.setMessage(error.error.Mesage)
          }
          this.router.navigate(['home','error'])
        }
      )
      this.router.navigate(['home','pricelist'])
    }
    createPriceList(list:IPriceListRequest){
      this.http.post(this.externalApis.getDataApiUrl() + '/pricelist/createpricelist',list).subscribe(
        ok => this.refreshList()
      )
      this.router.navigate(['home','pricelist'])
    }

    removePriceList(id:number){
      this.http.delete(this.externalApis.getDataApiUrl()+ '/pricelist/'+ id).subscribe(
        ok => this.refreshList(),
        error => {
            this.errorService.setMessage('510 Gone')
            this.router.navigate(['home','error'])
        }
      )
    }
}
