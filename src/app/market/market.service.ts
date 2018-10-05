import {Injectable} from '@angular/core';
import {Stock} from '../domain/Stock';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Trade} from '../domain/trade';

@Injectable({
  providedIn: 'root'
})

export class MarketServiceImpl {

  stocks: Stock[];
  counter: number;

  constructor(private httpClient: HttpClient) {
    this.stocks = [];
    this.getStockData().subscribe(
      data =>
      {
        for (let md of data)
        {
          this.stocks.push(new Stock(md.symbol, md.company, this));
        }
      },
      error =>
      {
        console.log('Cannot get market data from the server!!!');
      }
    );
  }

  add(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company, this));
  }

// to do
  delete(symbol: string){
      console.log(this.stocks.filter((value)=> {value.getSymbol()==symbol}));

  }
//

  buyStock(symbol: string, count: number): Trade
  {
    let stock: Stock = this.getStock(symbol);
    if (stock)
    {
      return new Trade(stock, count, stock.getPrice());
    }
    return null;
  }

  private getStock(symbol: string): Stock
  {
    return this.stocks.find(stock => stock.getSymbol() == symbol);
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

  private getStockData(): Observable <MarketData[]> {
    return this.httpClient.get<MarketData[]>('assets/market-data.json');
  }


  sellStock(trade: Trade): void {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
  }

}


interface MarketData
{
  symbol: string,
  company: string
}
