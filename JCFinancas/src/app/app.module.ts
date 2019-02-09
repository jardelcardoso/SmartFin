import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common'
import localePt  from '@angular/common/locales/pt';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule,MatExpansionModule} from '@angular/material';



import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/';
import { AuthGuard, JwtInterceptor,ErrorInterceptor  } from './guards';

import {LoginModule} from './login';
import { InvestimentoModule } from './investimento';
import {AppRoutingModule} from './app-routing.module';
import { ComponentsModule } from './components';
import {ControleFinanceiroModule} from './controle-financeiro';
import { OrcamentoModule} from './orcamento';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    MatCardModule,
    MatExpansionModule,
    LoginModule,
    InvestimentoModule,
    ComponentsModule,
    ControleFinanceiroModule,
    OrcamentoModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
       ,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
       ,{ provide: LOCALE_ID, useValue: 'pt-BR' }
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
