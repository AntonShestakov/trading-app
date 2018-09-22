import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { TradersComponent } from './traders/traders.component';
import {RoutingModule} from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
