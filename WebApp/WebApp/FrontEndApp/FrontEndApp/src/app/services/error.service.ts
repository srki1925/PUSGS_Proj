import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  private message:string =""

  setMessage(message:string){
      this.message = message
  }
  getMessage(){
    return this.message
  }
}
