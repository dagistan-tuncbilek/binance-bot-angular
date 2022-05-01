import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {HomeComponent} from "./module/home/home.component";
import {AppLogsComponent} from "./module/app-logs/app-logs.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'app-logs', component: AppLogsComponent  },
  { path: '', component: HomeComponent  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
