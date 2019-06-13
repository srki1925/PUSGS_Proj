import { Component, OnInit } from '@angular/core';
import {  BusstationService} from 'src/app/services/busstation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ILine, LineType } from 'src/app/services/interfaces';

@Component({
  selector: 'app-details-station',
  templateUrl: './details-station.component.html',
  styleUrls: ['./details-station.component.css']
})
export class DetailsStationComponent implements OnInit {

  constructor(private statioNService:BusstationService,private router:Router,
    private route:ActivatedRoute) { }
    public lines:ILine[]
    private Id
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.Id = +params['id']
      this.statioNService.subtToLines(this.Id).subscribe((data:ILine[])=>
      {this.lines = data})
    })
  }
  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }
}
