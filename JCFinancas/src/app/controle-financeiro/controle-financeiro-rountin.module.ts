import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../guards';
import {ControleFinanceiroRoutingComponent} from './controle-financeiro-routin.component';
import {HomeControleComponent} from './home-controle';

export const ControleFinRoutes: Routes = [

    	 { 
		path: 'controlefin', 
		component: ControleFinanceiroRoutingComponent,
        canActivate: [AuthGuard] ,
        children: [
		  {
			path: '', 
			component: HomeControleComponent 
		  }
		]
	} 

];

@NgModule({
  imports: [
    RouterModule.forChild(ControleFinRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ControleFinanceiroRoutingModule {
}
