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
  public removeLineForm:FormGroup
  constructor(private lineService:LineService) { }

  ngOnInit() {
    this.removeLineForm = new FormGroup({
      LineId: new FormControl(null,[Validators.required,Validators.nullValidator])
    })
    this.lineService.subscriberToLineChanges().subscribe((data:ILine[]) =>{this.lines = data;})
    this.lineService.refreshLines()
  }

onRemove(){
  this.lineService.removeLine(this.removeLineForm.value.LineId)
  this.lineService.refreshLines()
}
}
