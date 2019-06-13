import { Component, OnInit } from '@angular/core';
import { LineService } from 'src/app/services/line.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILine, ILineUpdateRequest } from 'src/app/services/interfaces';

@Component({
  selector: 'app-update-line',
  templateUrl: './update-line.component.html',
  styleUrls: ['./update-line.component.css']
})
export class UpdateLineComponent implements OnInit {

  constructor(private lineService:LineService,private router:Router,
    private route:ActivatedRoute) { }
  public updateForm:FormGroup
  public line:ILine
  private Id

  ngOnInit() {
    this.updateForm = new FormGroup({
      Name:new FormControl(null,[Validators.required]),
      LineType:new FormControl(null,[Validators.required])
    })
    this.route.params.subscribe((params:Params)=>{
        this.Id = +params['id']
        this.lineService.subToGetLine(this.Id).subscribe((data:ILine)=>{
          this.line = data
          this.updateForm.patchValue({
            Name:this.line.Name,
            LineType:this.line.LineType
          })
        })
    })
  }

  onUpdate(){
    if(this.updateForm.valid){
      let request:ILineUpdateRequest = {
        Id : this.Id,
        Name: this.updateForm.value.Name,
        LineType:this.updateForm.value.LineType,
        Version : this.line.VersionId
      }
      this.lineService.updateLine(request)
    }
  }

}
