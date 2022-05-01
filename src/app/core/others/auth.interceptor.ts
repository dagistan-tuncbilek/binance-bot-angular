import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {exhaustMap, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {DatabaseService} from "../services/database.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private databaseService: DatabaseService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.databaseService.accessToken){
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.databaseService.accessToken);
      const authReq = request.clone({headers: headers});
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
