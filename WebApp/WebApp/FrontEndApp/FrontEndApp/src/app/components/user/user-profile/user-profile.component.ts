import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUserProfileResponse } from 'src/app/services/interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public role = ''
  public user : IUserProfileResponse

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.role = this.authService.checkLoggedIn() ? this.authService.getUserRole() : ''
    this.authService.subscribeToUserDataChanges().subscribe((data : IUserProfileResponse) =>{
      this.user = data
    })
    this.authService.getUserData()
  }

}
