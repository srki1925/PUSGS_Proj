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



  constructor(private busStationService:BusstationService) { }

  ngOnInit() {

    this.busStationService.subscriberToBusChanges().subscribe((data:IBusStation[])=> {this.busStations = data;})
    this.busStationService.refreshBusStations()
    
  }
  onRemove(id:number){

    this.busStationService.removeBusStation(id)
    this.busStationService.refreshBusStations()
    
  }
}
