import { Injectable } from '@angular/core';
import {  Stock } from '../domain/Stock';

@Injectable({
  providedIn: 'root'
})
export class MarketServiceImpl {

  stocks: Stock[];
  counter: number;

  constructor() {  this.stocks  = this.getMockStocks();}

  add(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company, this));
  }

  private getMockStocks(): Stock[]{
    let stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing', this));
    stocks.push(new Stock('CAT','Caterpillar',  this));
    stocks.push(new Stock('KO','Coca-Cola', this));

    return stocks;
  }

  getStocks(): Stock[]{
    return this.stocks;
  }

  getPrice(symbol: string): number{
    return this.getRoundedPrice(symbol);
  }
  getUpdatedPrice(currentPrice: number): number{
    let multiplier  = 1;

    this.counter++;
    if (this.counter%2 == 0){
      multiplier  = -1;
    }
    return  Math.round((currentPrice+(Math.random() *multiplier))  * 100+Number.EPSILON)/100;
  }
  private getRoundedPrice(symbol: string): number
  {
    return Math.round((Math.random() * 1000 * symbol.length)
      * 100 + Number.EPSILON) / 100;
  }

  addStock(symbol: string, company: string) {
    this.add(symbol, company);
  }

}
