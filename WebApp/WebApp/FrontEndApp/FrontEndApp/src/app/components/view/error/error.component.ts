import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private errorService:ErrorService) { }

    public message:string
  ngOnInit() {
      this.message = this.errorService.getMessage()
  }

}
