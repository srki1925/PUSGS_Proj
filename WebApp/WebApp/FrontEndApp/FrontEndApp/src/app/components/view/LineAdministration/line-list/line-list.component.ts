import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { LineType, ILineRequest, ILine } from './../../../../services/interfaces';
import { LineService } from './../../../../services/line.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {

  public lines:ILine[]
  public removeLineForm:FormGroup

  public isAdmin = false;

  constructor(private lineService : LineService,
              private authService : AuthService) { }

  ngOnInit() {
    this.removeLineForm = new FormGroup({
      LineId: new FormControl(null,[Validators.required,Validators.nullValidator])
    })
    this.lineService.subscriberToLineChanges().subscribe((data:ILine[]) =>{this.lines = data;})
    this.lineService.refreshLines()
    
    this.isAdmin = this.authService.checkLoggedIn && this.authService.getUserRole() === 'Admin'
  }
  
  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }
onRemove(){
  if(this.removeLineForm.valid){
  this.lineService.removeLine(this.removeLineForm.value.LineId)
  this.lineService.refreshLines()
  }
}
}
