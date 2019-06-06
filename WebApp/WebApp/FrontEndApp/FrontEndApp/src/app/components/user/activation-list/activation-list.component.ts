import { Component, OnInit } from '@angular/core';
import { ConductorService } from './../../../services/conductor.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {IActivationData,PassengerType} from './../../../services/interfaces'
@Component({
  selector: 'app-activation-list',
  templateUrl: './activation-list.component.html',
  styleUrls: ['./activation-list.component.css']
})
export class ActivationListComponent implements OnInit {

  constructor(private conductorService:ConductorService) { }
  public activationList:IActivationData[]
  public acceptenceForm:FormGroup
  ngOnInit() {
    this.conductorService.subscribeToListChanged().subscribe((data:IActivationData[])=> {
      this.activationList = data;
      this.acceptenceForm = new FormGroup({
        Id:new FormControl(null,[Validators.required])
      })
    })
  }
  getPassengerTypeString(passType:number){
      switch(passType){
        case PassengerType.Student: return 'Student'
        case PassengerType.Retired: return 'Retired'
      }
  }

  onAccept(){
      this.conductorService.accept(this.acceptenceForm.value.Id)
  }

  onDeny(email: string){

  }

}
