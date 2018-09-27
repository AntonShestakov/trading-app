import { Injectable } from '@angular/core';
import {  Stock } from '../domain/Stock';

@Injectable({
  providedIn: 'root'
})



export class MarketServiceImpl implements MarketService {

  stocks: Stock[];
  counter: number;

  constructor() {  this.stocks  = this.getMockStocks();}

  add(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company));
  }

  private getMockStocks(): Stock[]{
    let stocks: Stock[] = [];

    stocks.push(new Stock('BA','Boeing'));
    stocks.push(new Stock('CAT','Caterpillar'));
    stocks.push(new Stock('KO','Coca-Cola'));

    return stocks;
  }

  getStocks(): Stock[]{
    return this.stocks;
  }

  getPrice(symbol: string): number{
    return Math.random()*1000*symbol.length;
  }
  getUpdatedPrice(currentPrice: number): number{
    let multiplier  = 1;

    this.counter++;
    if (this.counter%2 == 0){
      multiplier  = -1;
    }
    return  Math.round((currentPrice+(Math.random() *multiplier))  * 100+Number.EPSILON)/100;
  }

  addStock(symbol: string, company: string) {
    this.add(symbol, company);
  }

}

export interface MarketService
{
  getPrice(symbol: string): number;
  getUpdatedPrice(currentPrice: number): number;
  getStocks(): Stock[];
  addStock(symbol: string,  company:  string);

}
