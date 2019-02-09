import { Component, OnInit } from '@angular/core';

import {Menu, Modulo} from '../../models';

@Component({
  selector: 'app-home-controle',
  templateUrl: './home-controle.component.html',
  styleUrls: ['./home-controle.component.css']
})
export class HomeControleComponent implements OnInit {
  private config: any;
  private menu:Array<Menu>;
  constructor() { }

  ngOnInit() {
      this.config = JSON.parse(sessionStorage.config);
      console.log(this.config);
      this.init();
  }

    
     init(){
        let context = this;
       this.config.modulos.forEach( function (modulo) {
            if (modulo && modulo.NRO_MODULO == 1){
                context.menu = modulo.menu;
            }
        });
  
        
    }
}
