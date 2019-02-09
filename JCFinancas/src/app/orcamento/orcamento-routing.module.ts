import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../guards';
import {OrcamentoRoutingComponent} from './orcamento-routing.component';
import {HomeOrcamentoComponent} from './home-orcamento';

export const OrcamentoRoutes: Routes = [

    	{ 
		path: 'orcamento', 
		component: OrcamentoRoutingComponent,
        canActivate: [AuthGuard] ,
        children: [
		  {
			path: '', 
			component: HomeOrcamentoComponent 
		  }
		]
	} 



];

@NgModule({
  imports: [
    RouterModule.forChild(OrcamentoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrcamentoRoutingModule {
}
