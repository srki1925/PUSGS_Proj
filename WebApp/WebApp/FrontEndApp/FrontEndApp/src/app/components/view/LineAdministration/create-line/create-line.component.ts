import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { LineType, ILineRequest, ILine } from './../../../../services/interfaces';
import { LineService } from './../../../../services/line.service';

@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.css']
})
export class CreateLineComponent implements OnInit {

  constructor(private lineService: LineService) { }
  public lineForm: FormGroup
  public validationMessage:string = ""


  ngOnInit() {
    this.lineForm = new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.nullValidator]),
      Type: new FormControl("")
    });

    

  }

  onSubmit() {
    if(this.lineForm.valid){
      this.validationMessage = "";
    let Line: ILineRequest = {
      Name: this.lineForm.value.Name,
      LineType: this.lineForm.value.Type
    }
    this.lineService.addLine(Line);
  }
  this.validationMessage = "All fields are required!!"
  }


}
