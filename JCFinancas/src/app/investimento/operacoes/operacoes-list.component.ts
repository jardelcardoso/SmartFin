import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

import {OperacaoService} from '../services';

@Component({
  selector: 'app-operacoes-list',
  templateUrl: './operacoes-list.component.html',
  styleUrls: ['./operacoes-list.component.css']
})
export class OperacoesListComponent implements OnInit {

  private carteiras:any;
  private tiposProdutos:any;
  private meses:any;
  private years:any;
  private filter:any;
  private operacaoSelecionada:any;

  constructor(private operacaoService : OperacaoService) { }

  ngOnInit() {
    this.filter = {}
    this.buscarConfig();
  }

  private buscarConfig(){
    this.operacaoService.buscarConfig().subscribe(
      response => this.processarRetorno( response),
      error => this.processaErro(error)
    );
  }
  processaErro(error : any): any {
    console.log(error);

  }
  processarRetorno(response : any): any {
    this.carteiras = response.carteiras;
    this.tiposProdutos = response.tipos_produtos;

    this.meses = response.meses;
    this.meses.forEach(element => {

      if (element.atual){
        this.filter.month = element.codigo;
      }
    });

    this.carteiras.forEach(element => {
      if(element.IND_PADRAO == 1){
        this.filter.carteira = element.NRO_CARTEIRA;
      }
    });

    this.years = response.years;
    this.years.forEach(element => {
      if (element.atual){
        this.filter.year = element.year;
      }
    });
    //console.log(this.carteiras);
    //console.log(response.dtAtual);
  }
  pesquisar(){
  //  alert('booo');




    this.operacaoService.resumoPorCarteiraData(this.filter).subscribe(
      response => this.processaRetornoResumo( response),
      error => this.processaErro(error)
    );

  }

  processaRetornoResumo(response : any){
    this.tiposProdutos.forEach(element => {

       element.dados = response.filter(function(value){
          return element.SIGLA == value.SIGLA;
       });;
       let custoTotalTipo:any = 0;
       element.dados.forEach(tipo => {

         custoTotalTipo += tipo.CUSTO_TOTAL;
       });

       element.dados.forEach(tipo => {

        tipo.CUSTO_TOTAL_SIGLA = custoTotalTipo;
        tipo.PERC_CARTEIRA = ((tipo.CUSTO_TOTAL *100)/tipo.CUSTO_TOTAL_SIGLA);
      });



     // console.log(this.tiposProdutos);
    });
    console.log(this.tiposProdutos);
  }

  cadastrarOperacao(){

  }

}
