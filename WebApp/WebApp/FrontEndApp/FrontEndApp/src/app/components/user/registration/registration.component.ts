import { Component, OnInit } from '@angular/core';
import {IRegistrationRequest } from './../../../services/interfaces'
import { PassengerService } from './../../../services/passenger.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private passengerService:PassengerService) { }
  public registrationForm:FormGroup
  ngOnInit() {
    this.registrationForm = new FormGroup({
      FirstName: new FormControl(null,[Validators.required,Validators.nullValidator]),
      LastName: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Email: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Password: new FormControl(null,[Validators.required,Validators.nullValidator]),
      PassengerType: new FormControl(),
      DoB: new FormControl(null,[Validators.required]),
      ImageUri: new FormControl(null,[Validators.required,Validators.nullValidator])
    })
  }
  
  onSubmit(){
    if(this.registrationForm.valid){
      let passenger : IRegistrationRequest ={
        FirstName: this.registrationForm.value.FirstName,
        LastName: this.registrationForm.value.LastName,
        Email: this.registrationForm.value.Email,
        Password: this.registrationForm.value.Password,
        ConfirmPassword: this.registrationForm.value.Password,
        PassengerType: this.registrationForm.value.PassengerType,
        ImageUri: this.registrationForm.value.ImageUri,
        DoB:this.registrationForm.value.DoB
      }
      this.passengerService.register(passenger)
    }
  }
}
