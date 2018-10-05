import { Component, OnInit } from '@angular/core';
import {MarketServiceImpl} from '../../market/market.service';
import {FormControl} from '@angular/forms';
import {Stock} from '../../domain/Stock';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/startWith';
import 'rxjs-compat/add/operator/map';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stockInput = new FormControl();
  filteredStocks: Observable<Stock[]>;
  stocks: Stock[];

  constructor(private marketService: MarketServiceImpl) { }

  ngOnInit() {
    this.stocks = this.marketService.getStocks();

    this.filteredStocks = this.stockInput.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.stocks.slice());
  }

  filter(val: string): Stock[] {
    return this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

}
