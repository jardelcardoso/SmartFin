import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import * as jQuery from 'jquery';
declare var jQuery:any;

import {CarteiraService}from './../../services';
import {CarteiraModel} from './../../models';
import {MensagemModel} from './../../../models';


@Component({
  selector: 'app-carteira-casdastro',
  templateUrl: './carteira-cadastro.component.html',
  styleUrls: ['./carteira-cadastro.component.css']
})
export class CarteiraCadastroComponent implements OnInit {

   @Input() id: string;
   @Input() carteira: any;  
 
 @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private carteriaservice:CarteiraService,
              private toastyService:ToastyService, 
              private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  }

  salvar() {
       this.carteriaservice.salvar(this.carteira).subscribe(
          response => this.processaRetorno( response),
          error => this.processaRetornoErro(error)
        );
    }

    processaRetorno(resp:MensagemModel){
    	  var toastOptions:ToastOptions = {
            title: "Carteira!",
            msg: resp.msg,
            showClose: true,
            timeout: 7000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
               // console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                //console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        if(resp.type){
            this.toastyService.info(toastOptions);
             this.onConfirm.emit();
             jQuery('#cadCarteiraModal').modal('hide');
        }else{
            this.toastyService.error(toastOptions);
        }
    }

    processaRetornoErro(error:any){

    }


}
