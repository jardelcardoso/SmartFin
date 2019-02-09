
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import {CorretoraModel} from '../models';
import {MensagemModel} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CorretoraService {
	 private readonly BASE_URL = "http://localhost:8081/"

  constructor(private http: HttpClient) { }



buscar(nroCorretora: number): Observable<any> {
        let params = 'corretora/buscar?NRO_CORRETORA=';

        return this.http
            .get(this.BASE_URL + params+nroCorretora).pipe(
          map(response => response as any),
          catchError(error => observableThrowError(error)),);
    }

   excluir(nroCorretora: number): Observable<MensagemModel> {
        let params = 'corretora/excluir';

        return this.http
            .post(this.BASE_URL + params,{NRO_CORRETORA:nroCorretora}).pipe(
              map(response => response as MensagemModel),
              catchError(error => observableThrowError(error)),);
    }

     salvar(corretora:CorretoraModel) : Observable<MensagemModel>{
      let params = 'corretora/salvar';
       return this.http
            .post(this.BASE_URL + params,corretora).pipe(
              map(response => response as MensagemModel),
              catchError(error => observableThrowError(error)),);

    }

}
