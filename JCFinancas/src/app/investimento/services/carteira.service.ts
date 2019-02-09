
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import {CarteiraModel,CarteiraResponse} from '../models';
import {MensagemModel} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  private readonly BASE_URL = "http://localhost:8081/"
  
    
  constructor(private http: HttpClient) { }
    
    buscar(nroCarteira: number): Observable<CarteiraResponse> {
        let params = 'carteira/buscar?NRO_CARTEIRA=';

        return this.http
            .get(this.BASE_URL + params+nroCarteira).pipe(
          map(response => response as CarteiraResponse),
          catchError(error => observableThrowError(error)),);
    }
    
    excluir(nroCarteira: number): Observable<MensagemModel> {
        let params = 'carteira/excluir';

        return this.http
            .post(this.BASE_URL + params,{NRO_CARTEIRA:nroCarteira}).pipe(
              map(response => response as MensagemModel),
              catchError(error => observableThrowError(error)),);
    }

    salvar(carteira:CarteiraModel) : Observable<MensagemModel>{
      let params = 'carteira/salvar';
       return this.http
            .post(this.BASE_URL + params,carteira).pipe(
              map(response => response as MensagemModel),
              catchError(error => observableThrowError(error)),);

    }
    
    
}
