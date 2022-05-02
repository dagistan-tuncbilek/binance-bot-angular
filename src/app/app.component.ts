import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "./core/services/database.service";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private databaseService: DatabaseService, private router: Router) {
    const url = window.location.href.split(':');
    this.databaseService.baseUrl = url[0] +  ':' + url[1] + ':' + environment.basePort;
    console.log(this.databaseService.baseUrl)
  }

  ngOnInit(): void {
    const token = window.localStorage.getItem('accessToken');
    if (token){
      this.databaseService.accessToken = token;
      this.router.navigate(['/'])
    }
  }
}
