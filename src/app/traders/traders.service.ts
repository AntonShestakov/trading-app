import {Injectable, OnInit} from '@angular/core';
import {Trader} from '../domain/Trader';

@Injectable({
  providedIn: 'root'
})

export class TradersService  {

  traders: Trader[];

  constructor() { this.traders = this.getMockTraders(); }

  private getMockTraders(): Trader[]
  {
    let traders: Trader[] = [];

    traders.push(new Trader('Oleg'));
    traders.push(new Trader('Anna'));
    traders.push(new Trader('Anton'));
    return traders;
  }

  add(name: string)
  {
    this.traders.push(new Trader(name));
  }

  getTraders(): Promise<Trader[]>
  {
    return new Promise(resolve =>
      setTimeout(() => resolve(Promise.resolve(this.traders)), 100));
  }
}
