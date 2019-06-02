import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './../interfaces'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private usersChanged = new Subject<IUser[]>()

  constructor(private http:HttpClient) { }

  subscriberToUserChanges() : Subject<IUser[]>{
      this.http.get('http://localhost:52295/api/admin/users').subscribe((data:IUser[]) =>{
        this.usersChanged.next(data)
      })

      return this.usersChanged;
  }
}
