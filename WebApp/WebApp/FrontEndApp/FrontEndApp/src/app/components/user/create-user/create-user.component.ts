import { Component, OnInit } from '@angular/core';
import { IUser, IConductorRequest, UserType } from './../../../services/interfaces'
import { AdminService } from './../../../services/admin-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public conductorForm : FormGroup
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.conductorForm = new FormGroup({
      FirstName: new FormControl(null, [ Validators.required, Validators.nullValidator]),
      LastName: new  FormControl(null, [ Validators.required, Validators.nullValidator]),
      Email: new FormControl(null, [ Validators.required, Validators.email, Validators.nullValidator]),
      Password: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.nullValidator]),
      DoB:new FormControl(null,[Validators.required])
    })
  }
  onSubmit(){
    if(!this.conductorForm.valid) return

    let conductor : IConductorRequest = {
      FirstName : this.conductorForm.value.FirstName,
      LastName : this.conductorForm.value.LastName,
      Email : this.conductorForm.value.Email,
      Password : this.conductorForm.value.Password,
      DoB:this.conductorForm.value.DoB
    }
    this.adminService.addConductor(conductor)
  }
}
