import {Component, OnInit} from '@angular/core';
import {Coin} from "../../core/models/coin";
import {DatabaseService} from "../../core/services/database.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../shared/confirmation/confirmation.component";
import {TradeType} from "../../core/models/trade-type";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  coins: Coin[] = [];
  form: FormGroup = this.fb.group({
    asset: this.fb.control(''),
    symbol: this.fb.control(''),
    sellAllPercentage: this.fb.control(null),
    sellOnePercentage: this.fb.control(null),
    sellOneCoin: this.fb.control(null),
  });

  constructor(private databaseService: DatabaseService, public dialog: MatDialog, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.coins = this.databaseService.coins;
  }

  openDialog(tradeType: string | TradeType): void {
    const {asset, symbol, sellOneCoin, sellOnePercentage, sellAllPercentage} = this.form.value;
    if (tradeType === TradeType.NewCoin && (!asset || !symbol)){
      return;
    }
    if (tradeType === TradeType.SellOne && (!sellOneCoin || !sellOnePercentage || sellOnePercentage < 1 || sellOnePercentage > 100)){
      return;
    }
    if (tradeType === TradeType.SellAll && (!sellAllPercentage || sellAllPercentage < 1 || sellAllPercentage > 100)){
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        switch (tradeType){
          case TradeType.NewCoin:
            this.createNewCoin(asset, symbol);
            break;
          case TradeType.SellAll:
            this.sellAll(sellAllPercentage);
            break;
          case TradeType.SellOne:
            this.sellOne(sellOneCoin, sellOnePercentage);
            break;
        }
      }
    });
  }

  private createNewCoin(asset: string, symbol: string) {
    const data = { asset, symbol };
    console.log(data);
    this.spinner.show();
    this.databaseService.createCoin(data).subscribe({
      next: coin => {
        this.databaseService.coins.push(coin);
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        console.log(err);
      }
    })
  }

  private sellAll(sellAllPercentage: number) {
    console.log('sellAll')
  }

  private sellOne(data: Coin, sellOnePercentage: number) {
    console.log('sellOne')
  }
}
