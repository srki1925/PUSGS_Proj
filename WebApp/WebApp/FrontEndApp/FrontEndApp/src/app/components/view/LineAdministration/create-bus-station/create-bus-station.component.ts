import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IBusStation, IBusStationRequest, IMarker } from './../../../../services/interfaces';
import { BusstationService } from './../../../../services/busstation.service';


@Component({
  selector: 'app-create-bus-station',
  templateUrl: './create-bus-station.component.html',
  styleUrls: ['./create-bus-station.component.css']
})
export class CreateBusStationComponent implements OnInit {

  constructor(private busService:BusstationService) { }
  public busForm:FormGroup
  public validationMessage:string =""

  //destination set
  destination = false;
  rideId:number;
  marker : IMarker = {lat : null, lng : null}
  //google maps specific
  latitude = 45.260656;
  longitude = 19.832157;
  zoom = 14;
  chosen = false;
  draggable = true;
  error = false;

  ngOnInit() {
    this.busForm = new FormGroup({
      Name: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Address: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Longitude: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Latitude: new FormControl(null,[Validators.required,Validators.nullValidator])
    });
  }

  onChoseLocation(event){
    this.marker.lat = event.coords.lat
    this.marker.lng = event.coords.lng
    this.chosen = true;
    console.log(event.coords)
    
    this.populateMarkerData(event)
  }

  onMarkerDrag(event){
    this.populateMarkerData(event)
  }

  populateMarkerData(event){
    this.busForm.setValue({
      Name : this.busForm.value.Name,
      Address: this.busForm.value.Address,
      Latitude : event.coords.lat,
      Longitude : event.coords.lng
    })
  }

  onSubmit(){
    if(this.busForm.valid){
      this.validationMessage = "";
      let busStation:IBusStationRequest = {
        Name:this.busForm.value.Name,
        Address:this.busForm.value.Address,
        Longitude: this.busForm.value.Longitude,
        Latitude: this.busForm.value.Latitude
      }
      this.busService.addBusStation(busStation);
    }else{
      this.validationMessage = "All fields are required!!"
    }
  }
}
