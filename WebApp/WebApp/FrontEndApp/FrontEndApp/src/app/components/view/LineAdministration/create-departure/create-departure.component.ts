import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IBusStation, IBusStationRequest,ILine,LineType, IDepartureRequest } from './../../../../services/interfaces';
import { DepartureService } from './../../../../services/departure.service'
import { LineService } from './../../../../services/line.service';
@Component({
  selector: 'app-create-departure',
  templateUrl: './create-departure.component.html',
  styleUrls: ['./create-departure.component.css']
})
export class CreateDepartureComponent implements OnInit {

  constructor(private departureService:DepartureService,private lineService:LineService) { }
public departureForm:FormGroup
public lines:ILine[]
public validationMessage:string = ""
  ngOnInit() {
    this.departureForm = new FormGroup({
      Time: new FormControl(null,[Validators.required,Validators.nullValidator]),
      DayType:new FormControl(null,[Validators.required]),
      LineId: new FormControl(null,[Validators.required])
    });
    this.lineService.subscriberToLineChanges().subscribe((data:ILine[]) => {this.lines = data;})
    this.lineService.refreshLines();
  }
  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }
  onSubmit(){

    if(this.departureForm.valid){
    let departure:IDepartureRequest = {
      Time:this.departureForm.value.Time,
      DayType:this.departureForm.value.DayType,
      LineId:this.departureForm.value.LineId
    }
    this.validationMessage=""
    this.departureService.addDeparture(departure)
  }
  this.validationMessage = "All fields are required!!"
}

  
}
