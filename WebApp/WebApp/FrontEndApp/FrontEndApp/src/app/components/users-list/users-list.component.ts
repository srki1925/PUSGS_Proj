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
  public blockForm : FormGroup
  
  constructor(private adminService : AdminService) { }

  ngOnInit() {


    this.blockForm = new FormGroup({
      UserId : new FormControl(null, [Validators.required, Validators.nullValidator])
    })


     this.adminService.subscriberToUserChanges().subscribe((data : IUser[]) =>{
      this.users = data;
     })
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
