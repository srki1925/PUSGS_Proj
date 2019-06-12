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
        })
    })
  }

}
