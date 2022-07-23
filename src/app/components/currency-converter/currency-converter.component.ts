import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {

  amount!: number;
  from = 'from';
  to = 'to';
  usd = 0;
  eur = 0;
  convertedAmount = 0;
  currencyArr: string[] = ['UAH', 'EUR', 'USD', 'PLN'];
  private sub: Subscription[] = [];

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.sub.push(this.currencyService.getRates(1, 'USD', 'UAH')
      .subscribe(data => this.usd = data.result));
    this.sub.push(this.currencyService.getRates(1, 'EUR', 'UAH')
      .subscribe(data => this.eur = data.result));
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => el.unsubscribe());
  }

  getConvertedValue() {
    if (this.to !== 'to' && this.from !== 'from' && this.amount) {
      this.sub.push(this.currencyService.getRates(this.amount, this.from, this.to)
        .subscribe(data => this.convertedAmount = data.result));
    }
  }

  changeCurrencies() {
    let temp = this.from;
    this.from = this.to;
    this.to = temp;
    this.getConvertedValue();
  }
}
