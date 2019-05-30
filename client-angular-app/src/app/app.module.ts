import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggingComponent } from './Components/logging/logging.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggingComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
