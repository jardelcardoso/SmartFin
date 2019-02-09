import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {CarteiraService} from '../services';
import {CarteiraResponse,CarteiraModel} from '../models';
import {MensagemModel} from '../../models';

import * as jQuery from 'jquery';
//declare var jQuery:any;

@Component({
  selector: 'app-carteira-lista',
  templateUrl: './carteira-lista.component.html',
  styleUrls: ['./carteira-lista.component.css']
})
export class CarteiraListaComponent implements OnInit {
    private possuiErro:boolean;
    private carteiras:any
    private carteiraSelecionada:any;
    private objMensagemCarteira: any;


   // @ViewChild('confirmaExclusao') modalConfirmDel:ElementRef;

  constructor(private carteiraService : CarteiraService,
              private toastyService:ToastyService,
              private toastyConfig: ToastyConfig) { }

  ngOnInit() {
      this.carteiraSelecionada = new CarteiraModel();
      this.objMensagemCarteira ={};
      this.carregarCarteiras();

  }

    incluir(carteira:CarteiraModel){
        if (carteira){
          this.carteiraSelecionada = {...carteira};
            //alert("Editando "+CarteiraModel);
            //$('#confirmaExclusao').modal('show');
        }else{
           this.carteiraSelecionada = new CarteiraModel();
        }

    }

    preparaExcluir(carteira:any){
        if (carteira){
            this.carteiraSelecionada = carteira;
            this.objMensagemCarteira = {msg:'Deseja excluir a Carteira: '+ this.carteiraSelecionada.DESCRICAO+'?'};
        }else{
            alert("Informe a Carteira!");
        }
    }

    excluir(carteira:any){
        this.carteiraService.excluir(carteira.NRO_CARTEIRA).subscribe(
          response => this.processarRetornoExcluir( response),
          error => this.processaRetornoExcluirErro(error)
        );
    }

    carregarCarteiras(){
        this.carteiraService
        .buscar(0)
          .subscribe(
              response => this.processarRetorno( response),
              error => this.processaRetornoExcluirErro(error)
        );
    }

    processarRetorno(resp:CarteiraResponse){
        this.carteiras = resp;
    }

    private processarRetornoExcluir(resp:MensagemModel){
        //console.log(resp);
          var toastOptions:ToastOptions = {
            title: "Exclusão de Carteira!",
            msg: resp.msg,
            showClose: true,
            timeout: 7000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        if(resp.type){
            this.toastyService.info(toastOptions);
            this.carregarCarteiras();
        }else{
            this.toastyService.error(toastOptions);
        }



    }

    private processaRetornoExcluirErro (erro: any){
        console.log(erro);
      /*  var toastOptions:ToastOptions = {
            title: "Erro ao excluir a carteira!",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.toastyService.info(toastOptions);
        */
    }



}
