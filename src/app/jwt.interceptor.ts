import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('jwt_token');
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && error.error.message === 'Token expired') {
            // Token expired, remove it from localStorage
            localStorage.removeItem('jwt_token');
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}