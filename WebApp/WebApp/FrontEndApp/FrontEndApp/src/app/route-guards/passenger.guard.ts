import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { basename } from 'path';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PassengerGuard implements CanActivate {

  constructor(private authService : AuthService,
              private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.checkLoggedIn() && this.authService.getUserRole() === 'Passenger'){
        return true
      }
      this.router.navigate(['home'])
  }
  
}
