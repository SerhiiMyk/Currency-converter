import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  baseUrl: string = 'https://api.exchangerate.host/';

  constructor(private httpClient: HttpClient) {
  }

  getRates(amount: number, from: string, to: string): Observable<any> {
    return this.httpClient.get<number>(`${ this.baseUrl }convert?amount=${ amount }&from=${ from }&to=${ to }`);
  }
}
