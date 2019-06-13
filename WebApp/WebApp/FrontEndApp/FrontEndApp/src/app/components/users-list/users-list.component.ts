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
  
  constructor(private adminService : AdminService) { }

  ngOnInit() {





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

  


}
