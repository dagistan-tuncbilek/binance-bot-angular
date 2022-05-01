import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../core/services/database.service";
import {Router} from "@angular/router";
import {Trade} from "../../core/models/trade";
import {Coin} from "../../core/models/coin";
import {MarketPrice} from "../../core/models/market-price";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trades: Trade[] = [];
  coins: Coin[] = [];
  mp: MarketPrice[] = [];
  totalValue = 0;

  constructor(private databaseService: DatabaseService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (!this.databaseService.accessToken){
      this.router.navigate(['', 'login']);
    }
    this.fetchTrades();
    this.fetchBasket();
  }

  fetchTrades(){
    this.spinner.show();
    this.databaseService.trades().subscribe({
      next: trades => {
        this.trades = trades;
        this.spinner.hide();
      },
      error: err => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

  fetchBasket(){
    this.spinner.show();
    this.databaseService.coins().subscribe({
      next: response => {
        this.mp = response.marketPrices;
        this.coins = response.coins;
        const averageFiatRatio = this.coins.reduce((a,b) => {
          const marketPrice = this.mp.find(p => p.symbol === b.symbol);
          console.log(marketPrice)
          if (marketPrice){
            return a + (+marketPrice.price / b.averagePrice);
          }
          return a;
        },0) / this.mp.length;

        this.coins.map(c => {
          const marketPrice = this.mp.find(p => p.symbol === c.symbol);
          if (marketPrice){
            c.marketPrice = +marketPrice.price;
            c.fiatRatio = (c.marketPrice / c.averagePrice) / averageFiatRatio;
          }
          return c;
        });
        this.totalValue = 0;
        for (const coin of this.coins){
          if (coin.marketPrice){
            this.totalValue += coin.marketPrice * coin.amount;
          }
        }
        this.mp = response.marketPrices;
        this.spinner.hide();
      },
      error: err => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

}
