import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule,Routes} from '@angular/router';
import {  MarketComponent} from '../market/market.component';
import {  TradersComponent} from '../traders/traders.component';
import {  TraderDetailsComponent} from '../trader-details/trader-details.component';

const routes: Routes = [

  {path:  'traders',  component: TradersComponent},
  {path:  'market',  component: MarketComponent},
  {path:  'traders/details/:name', component: TraderDetailsComponent},
  {path:  '', redirectTo: '/market',pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:  [RouterModule],
  declarations: []
})

export class RoutingModule { }
