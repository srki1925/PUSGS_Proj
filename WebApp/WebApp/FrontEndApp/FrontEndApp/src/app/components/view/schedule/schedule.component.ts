import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {ScheduleService } from './../../../services/schedule.service';
import { IScheduleRequest,ILine, IDeparture, LineType } from './../../../services/interfaces';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  constructor(private scheduleService:ScheduleService) { }
public lines:ILine[]
public departures:IDeparture[]
public scheduleForm:FormGroup
public selected = false
  ngOnInit() {
    this.scheduleForm = new FormGroup({
      DayType: new FormControl(null,[Validators.required]),
      LineType: new FormControl(null,[Validators.required]),
      LineId: new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    if(this.scheduleForm.valid){
      let schedueRequest : IScheduleRequest ={
        DayType : this.scheduleForm.value.DayType,
        LineId :this.scheduleForm.value.LineId
      }
      this.scheduleService.subscribeToDepartures(schedueRequest).subscribe((data:IDeparture[])=>{
        this.departures = data
      })
      this.selected = true
    }
  }
  onSelect(){
      let lineType = this.scheduleForm.value.LineType
      this.scheduleService.subscribeToLinesChanged(lineType).subscribe((data:ILine[])=>{
        this.lines = data
      })
      this.selected = false
  }

}
