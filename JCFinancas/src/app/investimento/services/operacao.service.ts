
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OperacaoService {
  private readonly BASE_URL = "http://localhost:8081/"

  constructor(private http: HttpClient) { }


  buscarConfig(): Observable<any> {
    let params = 'operacao/buscarConfig';

    return this.http.post(this.BASE_URL + params, {}).pipe(
      map(response => response as any),
      catchError(error => observableThrowError(error)),);
  }

  resumoPorCarteiraData(filter : any): Observable<any> {
    let params = 'operacao/resumoPorCarteiraData';

    return this.http.post(this.BASE_URL + params, filter).pipe(
      map(response => response as any),
      catchError(error => observableThrowError(error)),);
  }



}


