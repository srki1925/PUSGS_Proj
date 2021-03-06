import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
import { ActivationListComponent } from './components/conductor/activation-list/activation-list.component';
import { CreatePriceListItemComponent } from './components/view/Finances/create-price-list-item/create-price-list-item.component';
import { LoginComponent } from './components/login/login.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ListPriceListItemComponent } from './components/view/Finances/list-price-list-item/list-price-list-item.component';
import { ListPriceListComponent } from './components/view/Finances/list-price-list/list-price-list.component';
import { HomeComponent } from './components/home/home.component';
import { StationsComponent } from './components/view/LineAdministration/stations/stations.component'
import { CreatePriceListComponent } from './components/view/Finances/create-price-list/create-price-list.component';
import { LinesComponent } from './components/view/LineAdministration/lines/lines.component';
import { DeparturesComponent } from './components/view/LineAdministration/departures/departures.component';
import { PriceListsComponent } from './components/view/Finances/price-lists/price-lists.component';
import { ConductorComponent } from './components/conductor/conductor.component';
import { ValidateTicketComponent } from './components/conductor/validate-ticket/validate-ticket.component';
import { PriceListItemsComponent } from './components/view/Finances/price-list-items/price-list-items.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PriceListDetailsComponent } from './components/view/Finances/price-lists/price-list-details/price-list-details.component'
import { TicketsComponent } from './components/tickets/tickets/tickets.component';
import { BuyTicketComponent } from './components/tickets/buy-ticket/buy-ticket.component';
import { AllTicketsComponent } from './components/tickets/all-tickets/all-tickets.component';
import { TicketsListComponent } from './components/tickets/buy-ticket/tickets-list/tickets-list.component'
import { ScheduleComponent } from './components/view/schedule/schedule.component';
import { AddStationsComponent } from './components/view/LineAdministration/lines/add-stations/add-stations.component';
import { LineDetailsComponent } from './components/view/LineAdministration/lines/line-details/line-details.component';
import { RemoveStationComponent } from './components/view/LineAdministration/lines/remove-station/remove-station.component';
import { UpdateLineComponent } from './components/view/LineAdministration/lines/update-line/update-line.component';
import { DetailsStationComponent } from './components/view/LineAdministration/stations/details-station/details-station.component';
import { UpdatePriceListComponent } from './components/view/Finances/price-lists/update-price-list/update-price-list.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user/user-profile/edit-profile/edit-profile.component';
import { AgmCoreModule } from '@agm/core'
import { AgmDirectionModule } from 'agm-direction'
import { ErrorComponent } from './components/view/error/error.component';

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
    StationsComponent,
    CreatePriceListComponent,
    LinesComponent,
    DeparturesComponent,
    PriceListsComponent,
    ConductorComponent,
    ValidateTicketComponent,
    PriceListItemsComponent,
    PriceListDetailsComponent,
    TicketsComponent,
    BuyTicketComponent,
    AllTicketsComponent,
    TicketsListComponent,
    ScheduleComponent,
    AddStationsComponent,
    LineDetailsComponent,
    RemoveStationComponent,
    UpdateLineComponent,
    DetailsStationComponent,
    UpdatePriceListComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    EditProfileComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI'
    }),
    AgmDirectionModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
