import { Component, OnInit } from '@angular/core';
import { CurrencyService, Currency } from './currency.service';
import { CurrencyValueResponse } from './currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
    currency: string = '';
    name: string = '';
  value: number | null = null;
  error: string | null = null;
  requests: Currency[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadAllRequests();
  }

  onSubmit() {
    this.currencyService.getCurrentCurrencyValue({ currency: this.currency, name: this.name }).subscribe({
      next: (response: CurrencyValueResponse) => {
        this.value = response.value;
        this.error = null;
        this.loadAllRequests(); // Refresh the requests list after new request
      },
      error: err => {
        this.error = err.error.error;
        this.value = null;
      }
    });
  }

  loadAllRequests() {
    this.currencyService.getAllRequests().subscribe({
      next: (data: Currency[]) => {
        this.requests = data;
      },
      error: err => {
        console.error('Error fetching requests', err);
      }
    });
  }
}
