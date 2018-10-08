import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MarketComponent} from './market/market.component';
import {TradersComponent} from './traders/traders.component';
import {RoutingModule} from './routing/routing.module';
import {TradersService} from './traders/traders.service';
import {MarketServiceImpl} from './market/market.service';
import {TraderDetailsComponent } from './trader-details/trader-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StocksComponent } from './trader-details/stocks/stocks.component';
import { MatAutocompleteModule, MatInputModule, MatOptionModule } from   "@angular/material";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent,
    TraderDetailsComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [TradersService, MarketServiceImpl],
  bootstrap: [AppComponent]
})
export class AppModule { }
