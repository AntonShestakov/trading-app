import {  Component, OnInit } from '@angular/core';
import {  Trader  } from '../domain/Trader';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  traders: Trader[];

  constructor() { }

  ngOnInit() {
    this.traders = this.getMockTraders();
  }

  private getMockTraders(): Trader[]
  {
    let traders: Trader[] = [];
    traders.push(new Trader('Oleg'));
    traders.push(new Trader('Anna'));
    return traders;
  }
  add(name: string)
  {
    this.traders.push(new Trader(name));
  }
}
