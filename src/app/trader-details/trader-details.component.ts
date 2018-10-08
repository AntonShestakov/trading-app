import {Component, OnInit, ViewChild} from '@angular/core';
import { Trader } from '../domain/Trader';
import {TradersService  } from '../traders/traders.service';
import {Trade} from '../domain/trade';
import {MarketServiceImpl} from '../market/market.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {Stock} from '../domain/Stock';
import {StocksComponent} from './stocks/stocks.component';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;

  countInput  = new FormControl();
  symbolInput = new FormControl();

  selectedStock: Stock;


  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;


  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private route: ActivatedRoute , private location: Location ) {
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
    if (this.selectedStock == null)
    {
      window.alert('Please select the stock');
      return;
    }

    let trade: Trade = this.marketService.buyStock(this.selectedStock.getSymbol(), this.countInput.value);
    this.trader.addToPortfolio(trade);

    this.stocksComponent.clean();

    this.selectedStock = null;
  }

  closeTrade(trade: Trade){

    this.marketService.sellStock(trade);
  }

  goBack(): void
  {
    this.location.back();
  }

  onStockSelect(stock: Stock)
  {
    this.selectedStock = stock;
  }
}
