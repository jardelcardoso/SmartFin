import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-modal',
  templateUrl: './ask-modal.component.html',
  styleUrls: ['./ask-modal.component.css']
})
export class AskModalComponent implements OnInit {
 @Input() id: string;
 @Input() mensagemTitulo: string;
 @Input() objMenssagem: any;  
 
 @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
    
  constructor() { }

  ngOnInit() {
  }
    
    executar() {
        this.onConfirm.emit();
    }

    get mensagemAsk():string {
        if (this.objMenssagem){
           // console.log(this.objMenssagem.msg);
        return this.objMenssagem.msg;
        }else{
            return '';
        }
        
    }

}
