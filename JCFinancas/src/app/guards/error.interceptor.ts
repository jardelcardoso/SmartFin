import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

//import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
            private toastyService:ToastyService, 
              private toastyConfig: ToastyConfig) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                delete sessionStorage.token;
                delete sessionStorage.config; 
              
                 this.router.navigate(['/login'], { queryParams: { returnUrl: 'Usuario não logado!' }});
            } else if (err.status === 500){
                //console.log(err);
                
                var toastOptions:ToastOptions = {
                title: "Erro ao excluir ao executar chamado do serviço!",
                msg: err.error,
                showClose: true,
                timeout: 5000,
                theme: 'default',
                onAdd: (toast:ToastData) => {
                    console.log('Toast ' + toast.id + ' erro intercept');
                },
                onRemove: function(toast:ToastData) {
                    console.log('Toast ' + toast.id + 'erro intercept!');
                }
                };
            // Add see all possible types in one shot
            this.toastyService.info(toastOptions);
                
            }
            //console.log(err.error);
             return throwError(err.error);
        } ));
    }
}