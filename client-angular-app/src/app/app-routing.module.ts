import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUserComponent} from './Components/create-user/create-user.component'
import{LoggingComponent} from './Components/logging/logging.component'
const routes: Routes = [
  {
    path:'',
    redirectTo:'/Login',
    pathMatch:'full'
},
{
  path:'CreateUser',
  component:CreateUserComponent
},
{
  path:'Login',
  component:LoggingComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
