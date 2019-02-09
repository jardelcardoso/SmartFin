import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatCardModule,MatExpansionModule} from '@angular/material';

import {ControleFinanceiroRoutingComponent} from './controle-financeiro-routin.component';
import {HomeControleComponent} from './home-controle';
import {ControleFinanceiroRoutingModule} from './controle-financeiro-rountin.module';
import { ComponentsModule } from '../components';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
      RouterModule,
      FormsModule,
      HttpModule,
      ComponentsModule,
      ControleFinanceiroRoutingModule
  ],
  declarations: [ControleFinanceiroRoutingComponent,HomeControleComponent]
})
export class ControleFinanceiroModule { }
