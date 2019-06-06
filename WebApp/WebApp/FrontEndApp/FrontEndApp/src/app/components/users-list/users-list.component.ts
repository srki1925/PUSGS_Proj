import { Component, OnInit } from '@angular/core';
import { IUser, IConductorRequest, UserType } from './../../services/interfaces'
import { AdminService } from './../../services/admin-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  public users : IUser[]
  public conductorForm : FormGroup
  public blockForm : FormGroup
  
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.conductorForm = new FormGroup({
      FirstName: new FormControl(null, [ Validators.required, Validators.nullValidator]),
      LastName: new  FormControl(null, [ Validators.required, Validators.nullValidator]),
      Email: new FormControl(null, [ Validators.required, Validators.email, Validators.nullValidator]),
      Password: new FormControl(null, [ Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.nullValidator])
    })

    this.blockForm = new FormGroup({
      UserId : new FormControl(null, [Validators.required, Validators.nullValidator])
    })


     this.adminService.subscriberToUserChanges().subscribe((data : IUser[]) =>{
      this.users = data;
     })
  }

  getUserTypeString(userType : number) : string{
    switch(userType){
      case UserType.Passenger: return 'Passenger'
      case UserType.Conductor: return 'Conductor'
      case UserType.Administrator: return 'Administrator'
    }
  }

  onSubmit(){
    if(!this.conductorForm.valid) return

    let conductor : IConductorRequest = {
      FirstName : this.conductorForm.value.FirstName,
      LastName : this.conductorForm.value.LastName,
      Email : this.conductorForm.value.Email,
      Password : this.conductorForm.value.Password
    }
    this.adminService.addConductor(conductor)
  }

  onBlockUser(){
    if(!this.blockForm.valid) return

    this.adminService.blockUser(this.blockForm.value.UserId)
  }

  onUnBlockUser(){
    if(!this.blockForm.valid) return

    this.adminService.unblockUser(this.blockForm.value.UserId)
  }
}
