import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
 	 private produtos: any;
 	 private produtoSelecionado: any;
	 private objMensagemProduto : any;

  constructor() { }

  ngOnInit() {
  }

  //{"nome":"","sigla":"","tipo":3}

}
