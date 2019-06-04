import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component'
import {CreateLineComponent} from './components/view/LineAdministration/create-line/create-line.component'
import {LineListComponent} from './components/view/LineAdministration/line-list/line-list.component'
import {CreateBusStationComponent} from './components/view/LineAdministration/create-bus-station/create-bus-station.component'
import {ListBusStationComponent} from './components/view/LineAdministration/list-bus-station/list-bus-station.component'


const routes: Routes = [
  { path : 'users', component : UsersListComponent },
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: '**', redirectTo:'home'},
  {path: 'createLine',component: CreateLineComponent},
  {path: 'lines',component:LineListComponent},
  {path:'createBusStation',component:CreateBusStationComponent},
  {path:'busStations',component:ListBusStationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
