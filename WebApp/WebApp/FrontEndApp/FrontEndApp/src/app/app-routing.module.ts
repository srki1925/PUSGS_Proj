import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component'
import {CreateLineComponent} from './components/view/LineAdministration/create-line/create-line.component'

const routes: Routes = [
  { path : 'users', component : UsersListComponent },
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: '**', redirectTo:'home'},
  {path: 'createLine',component: CreateLineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
