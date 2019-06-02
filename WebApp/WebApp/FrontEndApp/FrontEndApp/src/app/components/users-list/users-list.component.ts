import { Component, OnInit } from '@angular/core';
import { IUser } from './../../services/interfaces'
import { AdminService } from './../../services/adminService/admin-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

  public users : IUser[]
  public rideForm : FormGroup
  
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.rideForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      cartype: new FormControl(0),
      driver: new FormControl(null),
      fare: new FormControl(Validators.required,Validators.min(0))
    });
     this.adminService.subscriberToUserChanges().subscribe((data : IUser[]) =>{
        this.users = data;
     })
  }
}
