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
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ActivationListComponent } from './components/user/activation-list/activation-list.component';
import { CreatePriceListItemComponent } from './components/view/Finances/create-price-list-item/create-price-list-item.component';
import { LoginComponent } from './components/login/login.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ListPriceListItemComponent } from './components/view/Finances/list-price-list-item/list-price-list-item.component';
import { ListPriceListComponent } from './components/view/Finances/list-price-list/list-price-list.component';
import { HomeComponent } from './components/home/home.component';
import { StationsComponent } from './components/view/LineAdministration/stations/stations.component'

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
    ListDepartureComponent,
    RegistrationComponent,
    ActivationListComponent,
    CreatePriceListItemComponent,
    LoginComponent,
    DropdownDirective,
    HomeComponent,
    ListPriceListItemComponent,
    ListPriceListComponent,
    StationsComponent
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
