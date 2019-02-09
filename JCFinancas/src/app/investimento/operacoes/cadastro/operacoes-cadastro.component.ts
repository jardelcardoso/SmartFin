import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-operacoes-cadastro',
  templateUrl: './operacoes-cadastro.component.html',
  styleUrls: ['./operacoes-cadastro.component.css']
})
export class OperacoesCadastroComponent implements OnInit {
  @Input() id: string;
  @Input() operacao: any;

  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  options: FormGroup;


  constructor(fb: FormBuilder) {
    this.options = fb.group({
      color: 'primary',
      fontSize: [16, Validators.min(10)],
    });

   }

  ngOnInit() {
  }
  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }
}
