import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLineComponent } from './components/view/LineAdministration/create-line/create-line.component'
import { CreateBusStationComponent } from './components/view/LineAdministration/create-bus-station/create-bus-station.component'
import { CreateDepartureComponent } from './components/view/LineAdministration/create-departure/create-departure.component'
import { RegistrationComponent } from './components/user/registration/registration.component'
import { ActivationListComponent } from './components/conductor/activation-list/activation-list.component'
import { CreatePriceListItemComponent } from './components/view/Finances/create-price-list-item/create-price-list-item.component'
import { LoginComponent } from './components/login/login.component'
import { StationsComponent } from './components/view/LineAdministration/stations/stations.component'
import { CreatePriceListComponent } from './components/view/Finances/create-price-list/create-price-list.component'
import { LinesComponent } from './components/view/LineAdministration/lines/lines.component'
import { DeparturesComponent } from './components/view/LineAdministration/departures/departures.component'
import { PriceListsComponent } from './components/view/Finances/price-lists/price-lists.component'
import { UserComponent } from './components/user/user.component'
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ConductorComponent } from './components/conductor/conductor.component'
import { ValidateTicketComponent } from './components/conductor/validate-ticket/validate-ticket.component'
import { PriceListItemsComponent } from './components/view/Finances/price-list-items/price-list-items.component'
import { LoginGuard } from './route-guards/login.guard';
import { AdminGuard } from './route-guards/admin.guard';
import { ControllerGuard } from './route-guards/controller.guard';
import { TicketsComponent } from './components/tickets/tickets/tickets.component';
import { BuyTicketComponent } from './components/tickets/buy-ticket/buy-ticket.component';
import { AllTicketsComponent } from './components/tickets/all-tickets/all-tickets.component';
import { PassengerGuard } from './route-guards/passenger.guard';
import { PriceListDetailsComponent} from './components/view/Finances/price-lists/price-list-details/price-list-details.component'
import { ScheduleComponent} from './components/view/schedule/schedule.component'
import {AddStationsComponent} from './components/view/LineAdministration/lines/add-stations/add-stations.component'
import {LineDetailsComponent} from './components/view/LineAdministration/lines/line-details/line-details.component'
import {RemoveStationComponent} from './components/view/LineAdministration/lines/remove-station/remove-station.component'
import {UpdateLineComponent} from './components/view/LineAdministration/lines/update-line/update-line.component'
import {DetailsStationComponent} from './components/view/LineAdministration/stations/details-station/details-station.component'
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user/user-profile/edit-profile/edit-profile.component';

import { UpdatePriceListComponent} from './components/view/Finances/price-lists/update-price-list/update-price-list.component'

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register',component: RegistrationComponent, canActivate: [LoginGuard] },
  { path: 'change-password', component : ChangePasswordComponent},
  { path: 'user-profile', component : UserProfileComponent, children: [
    {path: 'edit', component : EditProfileComponent}
  ]},
  { path: 'home', children: [
    { path: 'users', component: UserComponent ,children:[
      { path:'addConductor',component: CreateUserComponent, canActivate: [AdminGuard] }
    ]},
    { path: 'lines', component: LinesComponent,children:[
      { path: 'new',component: CreateLineComponent, canActivate: [AdminGuard] },
      {path: ':id/add',component:AddStationsComponent},
      {path: ':id/details',component:LineDetailsComponent},
      {path: ':id/remove',component:RemoveStationComponent},
      {path: ':id/update',component:UpdateLineComponent}
    ]},
    { path:'stations',component: StationsComponent, canActivate: [AdminGuard] ,children:[
      { path:'new',component: CreateBusStationComponent },
      {path:':id/details',component:DetailsStationComponent}
    ]},
    { path: 'schedule',component: ScheduleComponent},
    { path:'departures',component: DeparturesComponent,children:[
      { path:'new',component: CreateDepartureComponent, canActivate : [AdminGuard] }
    ]},
    { path:'pricelist',component: PriceListsComponent, canActivate : [AdminGuard] ,children:[
      { path:'newPriceList',component: CreatePriceListComponent },
      {path:':id',component:PriceListDetailsComponent} ,
      {path:':id/update',component:UpdatePriceListComponent}
    ]},
    { path:'pricelistitem',component: PriceListItemsComponent, canActivate : [AdminGuard] ,children:[
      { path:'newItem',component: CreatePriceListItemComponent }
    ]},
    { path:'conductor',component: ConductorComponent, canActivate : [ControllerGuard], children:[
      { path:'activationlist',component: ActivationListComponent },
      { path:'validateticket',component: ValidateTicketComponent }
    ]},
    { path: 'tickets', component: TicketsComponent, children : [
      { path: 'buy', component : BuyTicketComponent },
      { path: 'allTickets', component : AllTicketsComponent, canActivate : [PassengerGuard] }
    ]}
  ]},
  { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
