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

  public registrationForm:FormGroup
  private imgB64String = ''
  public validationMessage = ''
  constructor(private passengerService:PassengerService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      FirstName: new FormControl(null,[Validators.required,Validators.nullValidator]),
      LastName: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Email: new FormControl(null,[Validators.required,Validators.nullValidator]),
      Password: new FormControl(null,[Validators.required,Validators.nullValidator]),
      ConfirmPassword: new FormControl(null, [Validators.required, Validators.nullValidator]),
      PassengerType: new FormControl(),
      DoB: new FormControl(null,[Validators.required]),
    })
  }
  
  onChange($event) : void{
    var file : File = $event.target.files[0]
    var reader : FileReader = new FileReader()

    reader.onloadend = (e) =>{
      this.imgB64String = <string>reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit(){
    this.validationMessage = ''
    if(!this.registrationForm.valid){
      this.validationMessage = 'All fields are required'
      return;
    }
    
    if(this.registrationForm.value.Password !== this.registrationForm.value.ConfirmPassword){
      this.validationMessage = 'Passwords must match!'
      return
    }

      let passenger : IRegistrationRequest ={
        FirstName: this.registrationForm.value.FirstName,
        LastName: this.registrationForm.value.LastName,
        Email: this.registrationForm.value.Email,
        Password: this.registrationForm.value.Password,
        ConfirmPassword: this.registrationForm.value.ConfirmPassword,
        PassengerType: this.registrationForm.value.PassengerType,
        EncodedImage: this.imgB64String,
        DoB:this.registrationForm.value.DoB
      }
      this.passengerService.register(passenger)
  }
}
