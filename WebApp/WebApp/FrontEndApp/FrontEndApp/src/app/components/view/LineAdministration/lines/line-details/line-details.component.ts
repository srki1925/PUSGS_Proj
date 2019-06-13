import { Component, OnInit } from '@angular/core';
import { IBusStation, IStationLineRequest} from './../../../../../services/interfaces'
import { LineService } from './../../../../../services/line.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.css']
})
export class LineDetailsComponent implements OnInit {

    public lat = 45.267136
    public lng = 19.833549
    public zoom = 15

    public origin;
    public destination;
    public waypoints = []

  constructor(private lineService:LineService,
    private router:Router,
      private route:ActivatedRoute) { }
      private Id:number
      public stations : IBusStation[]
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id'];
      this.lineService.subscrberToBusStations(this.Id).subscribe((data:IBusStation[])=>
        {
          this.stations = data;
          if(this.stations.length > 2){
            this.waypoints = []
            this.origin = {lat: this.stations[0].Latitude, lng: this.stations[0].Longitude}
            this.destination = {lat: this.stations[this.stations.length - 1].Latitude, lng: this.stations[this.stations.length - 1].Longitude}
            this.stations.slice(1, this.stations.length - 1).forEach((station:IBusStation) =>{
              this.waypoints.push({
                location: {lat: station.Latitude, lng: station.Longitude},
                stopover : true
              })
            })
            
          }else if(this.stations.length === 2){
            this.waypoints = []
            this.origin = {lat: this.stations[0].Latitude, lng: this.stations[0].Longitude}
            this.destination = {lat: this.stations[1].Latitude, lng: this.stations[1].Longitude}
          }
        })
    })
  }

}
