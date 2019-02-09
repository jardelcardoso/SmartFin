import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import * as jQuery from 'jquery';
declare var jQuery:any;

import {CorretoraModel} from '../models';
import {CorretoraService} from '../services';
import {MensagemModel} from '../../models';

@Component({
  selector: 'app-corretora-cadastro',
  templateUrl: './corretora-cadastro.component.html',
  styleUrls: ['./corretora-cadastro.component.css']
})
export class CorretoraCadastroComponent implements OnInit {

   @Input() id: string;
   @Input() corretora: any;  
 
   @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private corretoraservice:CorretoraService,
              private toastyService:ToastyService, 
              private toastyConfig: ToastyConfig) { }

  ngOnInit() {
  }

 salvar() {
       this.corretoraservice.salvar(this.corretora).subscribe(
          response => this.processaRetorno( response),
          error => this.processaRetornoErro(error)
        );
    }

    processaRetorno(resp:MensagemModel){
    	  var toastOptions:ToastOptions = {
            title: "Corretora!",
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
             jQuery('#cadCorretoraModal').modal('hide');
        }else{
            this.toastyService.error(toastOptions);
        }
    }

    processaRetornoErro(error:any){
    	console.log(error);
    }



}
