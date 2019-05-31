import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggingComponent } from './Components/logging/logging.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { NavBarComponent } from './Components/view/nav-bar/nav-bar.component';
import { PreviewComponent } from './Components/view/preview/preview.component';
import { PriceListComponent } from './Components/view/previews/price-list/price-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggingComponent,
    CreateUserComponent,
    NavBarComponent,
    PreviewComponent,
    PriceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
