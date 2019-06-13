import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  public lat = 45.267136
  public lng = 19.833549
  public zoom = 15

  constructor() { }

  ngOnInit() {

  }

}

