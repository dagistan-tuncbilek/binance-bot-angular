import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "./core/services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    const token = window.localStorage.getItem('accessToken');
    if (token){
      this.databaseService.accessToken = token;
      this.router.navigate(['/'])
    }
  }
}
