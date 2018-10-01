import {Stock} from './Stock';

export class Trade {
  private mark: number;
 // private last: number;

  private closePrice: number;
  private _isOpen: boolean;

  constructor(private stock: Stock, private count: number, priceToBuy: number){
    this._isOpen  = true;
    this.mark = priceToBuy;
  }

  getStockInfo(): string{
    return `${this.stock.getSymbol()} ${this.stock.getCompany()}`;
  }

  close(closePrice: number): void{
    this.closePrice = closePrice;
    this._isOpen  =false;
  }

  getMark(): number{
    return this.mark;
  }

  get_isOpen(): boolean{
    return this._isOpen;
  }

  getClosePrice(): number
  {
    return !this._isOpen ? this.closePrice : 0;
  }
  getCount(): number  {
    return this.count;
  }
  getStock(): Stock  {
    return this.stock;
  }

  getUnreleasedPnL(): number{
   return this.getRoundedNumber(
      this._isOpen? (this.count*(this.mark  - this.stock.getPrice())) : 0
   );
  }

  getReleasedPnL(): number{
    return this.getRoundedNumber(
      !this._isOpen? (this.count*(this.closePrice - this.mark)) : 0
    );
  }

  getPnL(): number{
    return
        this._isOpen? this.getUnreleasedPnL() : this.getReleasedPnL();
  }


  private getRoundedNumber(num: number) : number  {
    return Math.round(num * 100 + Number.EPSILON) / 100;
  }
}
