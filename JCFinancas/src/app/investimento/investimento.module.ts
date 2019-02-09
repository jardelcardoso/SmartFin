import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatCardModule,MatExpansionModule,MatSelectModule,MatOptionModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HomeInvestComponent } from './home-invest/home-invest.component';
import { InvestimentoRoutingComponent } from './investimento-routing.component';
import { InvertimentoRoutingModule } from './investimento-routing.module';
import { ComponentsModule } from '../components';
import { CarteiraListaComponent, CarteiraCadastroComponent } from './carteira';
import {CarteiraService, OperacaoService} from './services';
import { JwtInterceptor, ErrorInterceptor  } from '../guards';
import { CorretoraListComponent, CorretoraCadastroComponent } from './corretora';
import { ProdutoListComponent } from './produto';
import { OperacoesListComponent } from './operacoes';
import { OperacoesCadastroComponent } from './operacoes/cadastro/';


@NgModule({
  imports: [
      CommonModule,
      MatCardModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatSelectModule,
      MatOptionModule,
      RouterModule,
      FormsModule,
      HttpModule,
      HttpClientModule,
      ComponentsModule,
      InvertimentoRoutingModule
  ],
  declarations: [HomeInvestComponent,
                 InvestimentoRoutingComponent,
                 CarteiraListaComponent,
                 CarteiraCadastroComponent,
                 CorretoraListComponent,
                 CorretoraCadastroComponent,
                 ProdutoListComponent,
                 OperacoesListComponent,
                 OperacoesCadastroComponent
                ],
   providers: [CarteiraService,
              OperacaoService,
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
             , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
              ]
})
export class InvestimentoModule { }
