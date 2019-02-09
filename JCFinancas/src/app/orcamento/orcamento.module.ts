import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsModule } from '../components';

import {OrcamentoRoutingModule} from './orcamento-routing.module';
import { HomeOrcamentoComponent } from './home-orcamento/home-orcamento.component';
import {OrcamentoRoutingComponent} from './orcamento-routing.component'; 


@NgModule({
  imports: [
    CommonModule,
      RouterModule,
      FormsModule,
      HttpModule,
      ComponentsModule,
      OrcamentoRoutingModule
  ],
  declarations: [OrcamentoRoutingComponent,HomeOrcamentoComponent]
})
export class OrcamentoModule { }
