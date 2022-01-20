import { Injectable, Injector, INJECTOR } from '@angular/core';
import { HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorGuard implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any): Observable<HttpEvent<any>> {
    let authService = this.injector.get(RegisterService);
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    return next.handle(tokenizedRequest);
  }
}
