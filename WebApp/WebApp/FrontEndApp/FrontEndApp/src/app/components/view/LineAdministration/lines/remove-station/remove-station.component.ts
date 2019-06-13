import { Component, OnInit } from '@angular/core';
import { LineService } from 'src/app/services/line.service';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { IBusStation, IStationLineRequest, ILine } from 'src/app/services/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-remove-station',
  templateUrl: './remove-station.component.html',
  styleUrls: ['./remove-station.component.css']
})
export class RemoveStationComponent implements OnInit {

  constructor(private lineService:LineService,private router:Router,
    private route:ActivatedRoute) { }

  public removeForm:FormGroup
  public stations:IBusStation[]
  private Id
  private line : ILine

  ngOnInit() {
    this.removeForm = new FormGroup({
      StationId: new FormControl(null,[Validators.required])
    })
    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id']
      this.lineService.subscrberToBusStations(this.Id).subscribe((data:IBusStation[])=>{
        this.stations = data
      })
      this.lineService.subToGetLine(this.Id).subscribe((data:ILine) =>{
        this.line = data;
      })
    }) 
  }
  onRemove(){
    if(this.removeForm.valid){
      let request:IStationLineRequest ={
        LineId:this.Id,
        StationId:this.removeForm.value.StationId,
        LineVersion : this.line.VersionId,
        StationVersion : this.stations.find((station) => station.Id == this.removeForm.value.StationId).VersionId
      }
      this.lineService.removeStation(request)
    }
  }

}
