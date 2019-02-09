import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastyModule} from 'ng2-toasty';
import {MatCardModule,MatExpansionModule} from '@angular/material';

import {BarraComponent} from './barra';
import { AskModalComponent } from './modal/ask-modal/ask-modal.component';
import { AuthGuard, JwtInterceptor, ErrorInterceptor  } from '../guards';

@NgModule({
  declarations: [
      BarraComponent,
      AskModalComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatExpansionModule,
    ToastyModule,
    RouterModule
  ],
exports:[BarraComponent,AskModalComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
       , { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        ],
  bootstrap: []
})
export class ComponentsModule { }
