import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {MensagemModel} from '../../models';
import {CorretoraModel} from '../models';
import {CorretoraService} from '../services';

@Component({
  selector: 'app-corretora-list',
  templateUrl: './corretora-list.component.html',
  styleUrls: ['./corretora-list.component.css']
})
export class CorretoraListComponent implements OnInit {
	 private corretoras:any;
	 private corretoraSelecionada: any;
	 private objMensagemCorretora : any;

  constructor( private corretoraService : CorretoraService,
  	          private toastyService:ToastyService,
              private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  	this.corretoraSelecionada = new CorretoraModel();
  	this.carregarCorretoras();
  }

  carregarCorretoras(){
        this.corretoraService
        .buscar(0)
          .subscribe(
              response => this.processarRetorno( response),
              error => this.processaErro(error)
        );
    }

    processarRetorno(resp:any){
        this.corretoras = resp;
    }

    processaErro(error:any){
    	console.log(error);
    }


    preparaExcluir(corretora:any){
    	console.log(corretora);
        if (corretora){
            this.corretoraSelecionada = corretora;
            this.objMensagemCorretora = {msg:'Deseja excluir a Corretora: '+ this.corretoraSelecionada.NOME+'?'};
        }else{
            alert("Informe a Corretora!");
        }
    }

    excluir(corretora:any){
        this.corretoraService.excluir(corretora.NRO_CORRETORA).subscribe(
          response => this.processarExRetorno( response),
          error => this.processaErro(error)
        );
    }


    private processarExRetorno(resp:MensagemModel){
        //console.log(resp);
          var toastOptions:ToastOptions = {
            title: "Exclusão de Corretora!",
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
            this.carregarCorretoras();
        }else{
            this.toastyService.error(toastOptions);
        }
    }

        incluir(corretora:CorretoraModel){
          if (corretora){
            this.corretoraSelecionada = {...corretora};
              //alert("Editando "+CarteiraModel);
              //$('#confirmaExclusao').modal('show');
          }else{
            this.corretoraSelecionada = new CorretoraModel();
          }
        }
}
