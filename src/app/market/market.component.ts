import { Component, OnInit } from '@angular/core';
import {Stock} from '../domain/Stock';
import {MarketService, MarketServiceImpl} from './market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

  stocks: Stock[];

  constructor(private marketService: MarketServiceImpl){
    this.stocks = [];
  }

  ngOnInit()
  {
    this.updateStoks();
  }

  add(symbol: string, company: string)
  {
    this.marketService.addStock(symbol,company);
    this.updateStoks();
  }

  private getMockStocks(): Stock[]{
    let stocks: Stock[] = [];

    stocks.push(new Stock('BA','Boeing'));
    stocks.push(new Stock('CAT','Caterpillar'));
    stocks.push(new Stock('KO','Coca-Cola'));

    return stocks;
  }
  private updateStoks(){
    this.stocks = this.marketService.getStocks();
  }

}
