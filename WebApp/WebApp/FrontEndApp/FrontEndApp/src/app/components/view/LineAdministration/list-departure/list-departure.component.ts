import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IBusStation,LineType,DayType, IBusStationRequest,ILine, IDepartureRequest, IDeparture } from './../../../../services/interfaces';
import { DepartureService } from './../../../../services/departure.service'

@Component({
  selector: 'app-list-departure',
  templateUrl: './list-departure.component.html',
  styleUrls: ['./list-departure.component.css']
})
export class ListDepartureComponent implements OnInit {

  constructor(private departureService:DepartureService) { }
  public removeDepartureForm:FormGroup
  public departures :IDeparture[]
  ngOnInit() {
    this.removeDepartureForm = new FormGroup({
      DepId: new FormControl(null,[Validators.nullValidator,Validators.required])
    })
    this.departureService.subscriberToDepartureChanges().subscribe((data:IDeparture[])=> {this.departures = data;})
    this.departureService.refreshDepartures()
  }

  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }

  getDayTypeString(dayType: number) {
    switch (dayType) {
      case DayType.WorkDay: return 'WorkDay'
      case DayType.Saturday: return 'Saturday'
      case DayType.Sunday:return 'Sunday'
    }
  }
  onRemove(){
    this.departureService.removeDeparture(this.removeDepartureForm.value.DepId)
    this.departureService.refreshDepartures()
  }
}
