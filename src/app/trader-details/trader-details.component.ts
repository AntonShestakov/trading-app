import { Component, OnInit } from '@angular/core';
import { Trader } from '../domain/Trader';
import {  TradersService  } from '../traders/traders.service';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  constructor(private traderService: TradersService) {
    this.trader = new Trader('');
  }

  ngOnInit() {
    this.traderService.getTrader('Oleg').then(trader=>this.trader=trader);
  }

}
