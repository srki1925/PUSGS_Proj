import { Component, OnInit } from '@angular/core';
import { ConductorService } from 'src/app/services/conductor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.css']
})
export class ValidateTicketComponent implements OnInit {

  public message : string
  public validationForm : FormGroup
  public classBinding = 'text-success'

  constructor(private conductorService : ConductorService) { }

  ngOnInit() {
    this.message = null

    this.validationForm = new FormGroup({
      TicketId : new FormControl(null, [Validators.nullValidator, Validators.required])
    })

    this.conductorService.subscriberToValidationMessages().subscribe((data : string) => {
      this.message = data
      this.classBinding = this.message === 'Valid' ? 'text-success' : 'text-danger'
    })
  }

  onValidate(){
    if(!this.validationForm.valid) return
    this.conductorService.validateTicket(this.validationForm.value.TicketId)
  }

}
