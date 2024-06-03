import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency, CurrencyValueResponse } from './currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:8080/currencies'; // Zmień na odpowiedni URL backendu

  constructor(private http: HttpClient) { }

  getCurrentCurrencyValue(data: { currency: string, name: string }): Observable<CurrencyValueResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CurrencyValueResponse>(`${this.apiUrl}/get-current-currency-value-command`, data, { headers });
  }

  getAllRequests(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.apiUrl}/requests`);
  }
}
export { Currency };

