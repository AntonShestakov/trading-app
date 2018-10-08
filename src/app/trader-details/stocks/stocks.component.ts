import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Stock} from '../../domain/Stock';
import {Observable} from 'rxjs';
import {MarketServiceImpl} from '../../market/market.service';
import {map, startWith} from 'rxjs/operators';
import 'rxjs-compat/add/operator/startWith';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  @Output()  onStockSelect = new EventEmitter<Stock>();



  stockInput = new FormControl();

  stocks: Stock[];
  filteredStocks: Observable<Stock[]>;

  selected: Stock;
  constructor(private marketService: MarketServiceImpl) { }

  ngOnInit() {


    this.stocks = this.marketService.getStocks();

    // this.filteredStocks = Observable.of(this.stocks);

    this.filteredStocks = this.stockInput.valueChanges
      .pipe(
      startWith(''),
      map(val => val ? this.filter(val) : this.stocks.slice()));


    this.stockInput.valueChanges.startWith(null).subscribe(symbol =>
    {
      let stock = this.findStock(symbol);
      if (stock != null)
      {
        this.selected = stock;
        this.onStockSelect.emit(stock);
      }
      else
      {
        this.selected = null;
      }
    });

  }
  filter(val: string): Stock[] {
    return
    this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

  findStock(symbol: string): Stock
  {
    return this.stocks.find(stock => symbol === stock.getSymbol());
  }
  clean()
  {
    this.stockInput.setValue('');
    this.selected = null;
  }

};



