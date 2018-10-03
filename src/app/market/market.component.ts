import { Component, OnInit } from '@angular/core';
import {Stock} from '../domain/Stock';
import {MarketServiceImpl} from './market.service';

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

  delete(symbol: string){
    this.marketService.delete(symbol);
    this.updateStoks();
  }

  private getMockStocks(): Stock[]{
       return this.marketService.getStocks();
  }
  private updateStoks(){
    this.stocks = this.marketService.getStocks();
  }

}
