import { Component, OnInit } from '@angular/core';
import { IBusStation, IStationLineRequest, ILine} from './../../../../../services/interfaces'
import { BusstationService } from './../../../../../services/busstation.service'
import { LineService } from './../../../../../services/line.service'
import {FormControl,FormGroup,Validator, Validators} from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-add-stations',
  templateUrl: './add-stations.component.html',
  styleUrls: ['./add-stations.component.css']
})
export class AddStationsComponent implements OnInit {

  constructor(private busService:BusstationService,
    private lineService:LineService,private router:Router,
    private route:ActivatedRoute
    ) { }

  private Id:number;
  private line : ILine;
  public stations:IBusStation[]
  public selectForm:FormGroup
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id'];
      this.busService.subscriberToFilterBusStations(this.Id).subscribe((data:IBusStation[])=>
        {
          this.stations = data;
        })
      this.lineService.subToGetLine(this.Id).subscribe((data:ILine) =>{
        this.line = data
      })
    })
    this.selectForm = new FormGroup({
      StationId: new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    console.log('enter')
    let request:IStationLineRequest ={
        LineId:this.Id,
        StationId:this.selectForm.value.StationId,
        StationVersion : this.stations.find((station) => station.Id == this.selectForm.value.StationId).VersionId ,
        LineVersion : this.line.VersionId
    }
    this.lineService.addStation(request)
  }

}
