import { Component, OnInit } from '@angular/core';
import { Trader } from '../domain/Trader';
import {TradersService  } from '../traders/traders.service';
import {Trade} from '../domain/trade';
import {MarketServiceImpl} from '../market/market.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  countInput  = new FormControl();
  symbolInput = new FormControl();


  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private route: ActivatedRoute ) {
    this.trader = new Trader('');
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tradersService.getTrader(params.get('name')))
      .subscribe((trader: Trader) => this.trader = trader);


    this.countInput.setValue(10);
  }


  buyStock()
  {
    let trade: Trade =
      this.marketService.buyStock(this.symbolInput.value,  this.countInput.value);

    if (!trade)
    {
      alert(`symbol ${this.symbolInput.value} not found`);
      return;
    }
    this.trader.addToPortfolio(trade);
    this.symbolInput.setValue('');
  }

  closeTrade(trade: Trade){

    this.marketService.sellStock(trade);
  }
}
