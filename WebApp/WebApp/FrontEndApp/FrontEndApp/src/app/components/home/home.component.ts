import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userBlocked = false;
  username = '';
  constructor() { }

  ngOnInit() {
    this.userBlocked = false
    this.username = 'user'
  }
}