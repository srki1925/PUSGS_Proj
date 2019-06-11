import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.authService.getLoginChangeSubscriber().unsubscribe()
  }

  public loggedIn = false
  public role : string 

  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.checkLoggedIn()
    this.authService.getLoginChangeSubscriber().subscribe((data:boolean) =>{
      this.loggedIn = data
      this.role = this.authService.getUserRole()
      console.log('Role: ' + this.role)
    })
  }

  onLogout(){
    this.authService.logOut()
    this.router.navigate(['/login'])
  }
}
