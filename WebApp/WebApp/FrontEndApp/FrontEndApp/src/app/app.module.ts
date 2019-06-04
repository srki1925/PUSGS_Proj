import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ViewComponent } from './components/view/view.component';
import { UserComponent } from './components/user/user.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { NavBarComponent } from './components/view/nav-bar/nav-bar.component';
import { CreateLineComponent } from './components/view/LineAdministration/create-line/create-line.component';
import { LineListComponent } from './components/view/LineAdministration/line-list/line-list.component';
import { CreateBusStationComponent } from './components/view/LineAdministration/create-bus-station/create-bus-station.component';
import { ListBusStationComponent } from './components/view/LineAdministration/list-bus-station/list-bus-station.component';
import { CreateDepartureComponent } from './components/view/LineAdministration/create-departure/create-departure.component';
import { ListDepartureComponent } from './components/view/LineAdministration/list-departure/list-departure.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ViewComponent,
    UserComponent,
    CreateUserComponent,
    NavBarComponent,
    CreateLineComponent,
    LineListComponent,
    CreateBusStationComponent,
    ListBusStationComponent,
    CreateDepartureComponent,
    ListDepartureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
