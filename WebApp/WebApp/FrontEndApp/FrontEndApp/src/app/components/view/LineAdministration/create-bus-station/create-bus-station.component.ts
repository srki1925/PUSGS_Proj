import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IBusStation, IBusStationRequest } from './../../../../services/interfaces';
import { BusstationService } from './../../../../services/busstation.service';
@Component({
  selector: 'app-create-bus-station',
  templateUrl: './create-bus-station.component.html',
  styleUrls: ['./create-bus-station.component.css']
})
export class CreateBusStationComponent implements OnInit {

  constructor(private busService:BusstationService) { }
  public busForm:FormGroup

  ngOnInit() {
    this.busForm = new FormGroup({
      Name: new FormControl("",[Validators.required,Validators.nullValidator]),
      Address: new FormControl("",[Validators.required,Validators.nullValidator]),
      Longitude: new FormControl("",[Validators.required,Validators.nullValidator]),
      Latitude: new FormControl("",[Validators.required,Validators.nullValidator])
    });
  }

  onSubmit(){
    let busStation:IBusStationRequest = {
      Name:this.busForm.value.Name,
      Address:this.busForm.value.Address,
      Longitude: this.busForm.value.Longitude,
      Latitude: this.busForm.value.Latitude
    }
    this.busService.addBusStation(busStation);
  }
}
