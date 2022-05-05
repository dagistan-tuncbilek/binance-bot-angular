import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorResponse} from "../models/error-response";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Coin} from "../models/coin";
import {Trade} from "../models/trade";
import {MarketPrice} from "../models/market-price";
import {AppLog} from "../models/app-log";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseUrl = '';
  accessToken = '';
  trades: Trade[] = [];
  coins: Coin[] = [];
  mp: MarketPrice[] = [];

  constructor(private http: HttpClient) { }

  login(data: { password: string; username: string }) {
    return this.http
      .post<{access_token: string}>(`${this.baseUrl}/users/login`, data)
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  getTrades() {
    return this.http
      .get<Trade[]>(`${this.baseUrl}/crypto/trades`)
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  getCoins() {
    return this.http
      .get<{coins: Coin[], marketPrices: MarketPrice[]}>(`${this.baseUrl}/crypto/coins`)
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  appLogs(): Observable<AppLog[]> {
    return this.http
      .get<AppLog[]>(this.baseUrl + '/crypto/app-logs')
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  deleteAppLog(id: number): Observable<AppLog> {
    return this.http
      .delete<AppLog>(this.baseUrl + '/crypto/app-logs/' + id)
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  deleteAppLogs(){
    return this.http
      .get<{ count: number }>(this.baseUrl + '/crypto/delete-all')
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  createCoin(data: { symbol: string; asset: string }) {
    return this.http
      .post<Coin>(`${this.baseUrl}/crypto/add-coin`, data)
      .pipe(catchError((error) => throwError(() => DatabaseService.getErrorMessage(error))));
  }

  private static getErrorMessage(errorRes: ErrorResponse): string {
    let errorMessage = '';
    if (errorRes.status != null && errorRes.status == 0) {
      errorMessage = 'No connection';
    } else if (errorRes && errorRes.error && errorRes.error.message) {
      if (Array.isArray(errorRes.error.message)) {
        for (const m of errorRes.error.message) {
          errorMessage += m + ',\n';
        }
      } else {
        errorMessage = errorRes.error.message;
      }
    } else {
      errorMessage = 'Something went wrong';
    }
    console.log(errorMessage);
    return errorMessage;
  }

}
