import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import {UserRegistro,MensagemResponse} from '../models';
import { LoginService } from '../services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    private userRegistro : UserRegistro;
    private confirmPass : string;
    private temErro : boolean;
    private msgErro:string;
    
    @ViewChild("registroForm") registroForm: NgForm;
    
  constructor(private loginService : LoginService) { }


    ngOnInit() {
        this.userRegistro = new UserRegistro();
        this.temErro = false;
      }

    salvarUsuario(){
        if (this.registroForm.form.valid) {
            
            if (this.confirmPass !== this.userRegistro.pass) {
                this.temErro = true;
                this.msgErro = 'Correspondencias de senhas incorreta';
                //return;
            }else{
                  this.temErro = false;
             this.msgErro = '';
            
             this.loginService.registrar(this.userRegistro)
                    .subscribe(
                      response => this.processaRetorno( response),
    error => this.tratarErroGeral(error)
                    );
            }

          
            
        }
    }

    processaRetorno(mensagemResponse:MensagemResponse){
        if (mensagemResponse.type){
            this.temErro = true;
            this.msgErro = mensagemResponse.msg;
        }else{
            this.temErro = true;
            this.msgErro = mensagemResponse.msg;
        }
    }
    
tratarErroGeral(error: any){
    this.temErro = true ; 
    this.msgErro = 'Erro ao chamar o servidor';
    
}

    
}
