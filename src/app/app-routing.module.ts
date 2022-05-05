import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AppLogsComponent} from "./components/app-logs/app-logs.component";
import {TradeComponent} from "./components/trade/trade.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trade', component: TradeComponent },
  { path: 'app-logs', component: AppLogsComponent  },
  { path: 'home', component: HomeComponent  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
