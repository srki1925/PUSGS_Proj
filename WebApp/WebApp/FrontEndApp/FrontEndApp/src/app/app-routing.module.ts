import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component'
import {CreateLineComponent} from './components/view/LineAdministration/create-line/create-line.component'
import {LineListComponent} from './components/view/LineAdministration/line-list/line-list.component'
import {CreateBusStationComponent} from './components/view/LineAdministration/create-bus-station/create-bus-station.component'
import {ListBusStationComponent} from './components/view/LineAdministration/list-bus-station/list-bus-station.component'
import {CreateDepartureComponent} from './components/view/LineAdministration/create-departure/create-departure.component'
import {ListDepartureComponent} from './components/view/LineAdministration/list-departure/list-departure.component'
import {RegistrationComponent} from './components/user/registration/registration.component'
import {ActivationListComponent} from './components/conductor/activation-list/activation-list.component'
import {CreatePriceListItemComponent} from './components/view/Finances/create-price-list-item/create-price-list-item.component'
import {LoginComponent} from './components/login/login.component'
import{ListPriceListItemComponent} from './components/view/Finances/list-price-list-item/list-price-list-item.component'
import{ListPriceListComponent} from './components/view/Finances/list-price-list/list-price-list.component'
import { StationsComponent } from './components/view/LineAdministration/stations/stations.component'
import{CreatePriceListComponent} from './components/view/Finances/create-price-list/create-price-list.component'
import{LinesComponent} from './components/view/LineAdministration/lines/lines.component'
import{DeparturesComponent} from './components/view/LineAdministration/departures/departures.component'
import{PriceListsComponent} from './components/view/Finances/price-lists/price-lists.component'
import {UserComponent} from './components/user/user.component'
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ConductorComponent} from './components/conductor/conductor.component'
import {ValidateTicketComponent} from './components/conductor/validate-ticket/validate-ticket.component'

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path:'register',component:RegistrationComponent },
  { path:'createDeparture',component:CreateDepartureComponent },
  { path:'departures',component:ListDepartureComponent },
  { path:'acceptionlist',component:ActivationListComponent },
  { path:'CreatePriceListItem',component:CreatePriceListItemComponent } ,
  { path: 'home', children: [
    { path: 'users', component: UserComponent ,children:[
      {path:'addConductor',component:CreateUserComponent}
    ]},
    { path: 'lines', component: LinesComponent,children:[
          {path: 'new',component:CreateLineComponent}
    ]},
    { path:'stations',component:StationsComponent ,children:[
      {path:'new',component:CreateBusStationComponent}
    ]},
    {path:'departures',component:DeparturesComponent,children:[
      {path:'new',component:CreateDepartureComponent}
    ]},
    {path:'pricelist',component:PriceListsComponent ,children:[
      {path:'newItem',component:CreatePriceListItemComponent},
      {path:'newPriceList',component:CreatePriceListComponent},
      
    ]},
    {path:'conductor',component:ConductorComponent,children:[
      {path:'activationlist',component:ActivationListComponent},
      {path:'validateticket',component:ValidateTicketComponent}
    ]}
  ]},
   { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
