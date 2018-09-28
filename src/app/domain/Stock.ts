
import {MarketServiceImpl} from '../market/market.service';


export class Stock
{
  private price: number;
  constructor(private symbol: string, private company: string, private marketService: MarketServiceImpl) {

    this.price  = this.marketService.getPrice(symbol);
    this.initPriceFetcher();
  }

  private getRoundedPrice(): number
  {
    return Math.round((Math.random() * 1000 * this.symbol.length) * 100 +
      Number.EPSILON) / 100;
  }
  getSymbol(): string
  {
    return this.symbol;
  }
  getCompany(): string
  {
    return this.company;
  }

  getPrice(): number
  {
    return this.getRoundedPrice();
  }

  private initPriceFetcher()
  {
    setInterval(() =>
    {
      this.price = this.marketService.getUpdatedPrice(this.price);
      if (this.price <= 0)
      {
        this.price = this.marketService.getPrice(this.symbol);
      }
    }, 10000);
  }
}
