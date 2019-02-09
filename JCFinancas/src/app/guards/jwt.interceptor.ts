import { Injectable,NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
       
        
          request = request.clone({
                setHeaders: { 
                    Authorization: 'Portador '+sessionStorage.token
                }
            });
         return next.handle(request);
         }
}
