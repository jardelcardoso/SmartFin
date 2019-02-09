
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import {User,UserResponse,UserRegistro} from '../models';

@Injectable()
export class LoginService {
private readonly BASE_URL = "http://localhost:8081/"
  constructor(private http: Http) { }
    
    
    
    authenticate(user: User): Observable<UserResponse> {
        let params = `authenticate`;

        return this.http
            .post(this.BASE_URL + params,{"EMAIL":user.email,"PASS":user.pass}).pipe(
          map(response => response.json() as UserResponse),
          catchError(error => observableThrowError(error)),);
    }

    registrar (userRegistro: UserRegistro) : Observable<UserResponse>{
         let params = `registrar`;

        return this.http
            .post(this.BASE_URL + params,userRegistro).pipe(
          map(response => response.json() as UserResponse),
          catchError(error => observableThrowError(error)),);
    }
    
    logout(){
      delete   sessionStorage.token;
      delete  sessionStorage.config; 
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); 
        return observableThrowError(errMsg);
  }
    
}
