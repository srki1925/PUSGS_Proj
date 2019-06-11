import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public loggedIn = false
  public role : string 

  constructor(private authService : AuthService,
              private router : Router) {}

  ngOnInit() {
    // Get first values and subscribe to future changes
    this.loggedIn = this.authService.checkLoggedIn()
    this.role = this.authService.getUserRole();

    this.authService.getLoginChangeSubscriber().subscribe((data:boolean) =>{
      this.loggedIn = data
      this.role = this.authService.getUserRole()
      console.log('Role: ' + this.role)
    })
  }

  ngOnDestroy(): void {
    this.authService.getLoginChangeSubscriber().unsubscribe()
  }

  onLogout(){
    this.authService.logOut()
    this.router.navigate(['/login'])
  }
}
