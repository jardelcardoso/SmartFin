import { Component, OnInit } from '@angular/core';

import {Menu, Modulo} from '../../models';

@Component({
  selector: 'app-home-invest',
  templateUrl: './home-invest.component.html',
  styleUrls: ['./home-invest.component.css']
})
export class HomeInvestComponent implements OnInit {
    private config: any;
    private menu:Array<Menu>;
    private telaAtiva:string;
  constructor() { }

  ngOnInit() {
 
      this.config = JSON.parse(sessionStorage.config);
   
      this.init();
  }
    
    init(){
        let context = this;
       this.config.modulos.forEach( function (modulo) {
            if (modulo && modulo.NRO_MODULO == 2){
                context.menu = modulo.menu;
            }
        });
  
        
    }
    
    apresentaTela(tela:string){
        this.telaAtiva = tela;
    }

}
