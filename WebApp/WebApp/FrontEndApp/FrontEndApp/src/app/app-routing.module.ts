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
import {ActivationListComponent} from './components/user/activation-list/activation-list.component'
import {CreatePriceListItemComponent} from './components/view/Finances/create-price-list-item/create-price-list-item.component'
import {LoginComponent} from './components/login/login.component'
import{ListPriceListItemComponent} from './components/view/Finances/list-price-list-item/list-price-list-item.component'
import{ListPriceListComponent} from './components/view/Finances/list-price-list/list-price-list.component'

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', children: [
    { path: 'users', component: UsersListComponent },
    { path: 'lines', component: LineListComponent,children:[
          {path: 'new',component:CreateLineComponent}
    ]},
    { path:'stations',component:ListBusStationComponent,children:[
      {path:'new',component:CreateBusStationComponent}
    ]},
    {path:'departures',component:ListDepartureComponent,children:[
      {path:'new',component:CreateDepartureComponent}
    ]},
    {path:'pricelist',component:ListPriceListComponent ,children:[
      {path:'newItem',component:CreateLineComponent}
    ]}
  ]},
  {path:'registration',component:RegistrationComponent},
  {path:'createDeparture',component:CreateDepartureComponent},
  {path:'departures',component:ListDepartureComponent},

  {path:'acceptionlist',component:ActivationListComponent},
  {path:'CreatePriceListItem',component:CreatePriceListItemComponent} ,
   { path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
