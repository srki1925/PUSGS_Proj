import { Component, OnInit } from '@angular/core';
import { IBusStation, IStationLineRequest} from './../../../../../services/interfaces'
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
public stations:IBusStation[]
public selectForm:FormGroup
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id'];
      this.busService.subscriberToFilterBusStations(this.Id).subscribe((data:IBusStation[])=>
        {
          this.stations = data;
        })
    })
    this.selectForm = new FormGroup({
      StationId: new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    let request:IStationLineRequest ={
        LineId:this.Id,
        StationId:this.selectForm.value.StationId
    }
    this.lineService.addStation(request)
  }

}
