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
  private lineForm: FormGroup
  private removeForm: FormGroup
  private lines: ILine[]

  ngOnInit() {
    this.lineForm = new FormGroup({
      Name: new FormControl("", [Validators.required, Validators.nullValidator]),
      Type: new FormControl("")
    });

    this.lineService.subscriberToLineChanges().subscribe((data: ILine[]) => { this.lines = data; })

    this.removeForm = new FormGroup({
      LineId: new FormGroup(null, [Validators.required])
    })

  }

  onSubmit() {
    let Line: ILineRequest = {
      Name: this.lineForm.value.Name,
      LineType: this.lineForm.value.Type
    }
    this.lineService.addLine(Line);
  }
  getLineTypeString(lineType: number) {
    switch (lineType) {
      case LineType.City: return 'City'
      case LineType.Outskirts: return 'Outskirts'
    }
  }

  onRemoveLine() {
    return this.lineService.removeLine(this.removeForm.value.LineId)
  }
}
