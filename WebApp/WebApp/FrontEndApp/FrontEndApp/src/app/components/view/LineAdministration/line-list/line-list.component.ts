import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { LineType, ILineRequest, ILine } from './../../../../services/interfaces';
import { LineService } from './../../../../services/line.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

  public lines:ILine[]
  constructor(private lineService:LineService) { }

  ngOnInit() {
    this.lineService.subscriberToLineChanges().subscribe((data:ILine[]) =>{this.lines = data;})
    this.lineService.refreshLines()

  }
  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }
onRemove(id:number){

  this.lineService.removeLine(id)
  this.lineService.refreshLines()
  
}
}
