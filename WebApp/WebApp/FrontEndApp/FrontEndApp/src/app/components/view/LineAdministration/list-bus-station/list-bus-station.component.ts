import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { IBusStation, IBusStationRequest } from './../../../../services/interfaces';
import { BusstationService } from './../../../../services/busstation.service';

@Component({
  selector: 'app-list-bus-station',
  templateUrl: './list-bus-station.component.html',
  styleUrls: ['./list-bus-station.component.css']
})
export class ListBusStationComponent implements OnInit {

  public busStations:IBusStation[]
  public removeBusStationForm:FormGroup


  constructor(private busStationService:BusstationService) { }

  ngOnInit() {
    this.removeBusStationForm = new FormGroup({
      BusStationId: new FormControl(null,[Validators.required,Validators.nullValidator])
    })
    this.busStationService.subscriberToBusChanges().subscribe((data:IBusStation[])=> {this.busStations = data;})
    this.busStationService.refreshBusStations()
    
  }
  onRemove(){
    this.busStationService.removeBusStation(this.removeBusStationForm.value.BusStationId)
    this.busStationService.refreshBusStations()
  }
}
