import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../guards';
import {InvestimentoRoutingComponent} from './investimento-routing.component';
import {HomeInvestComponent} from './home-invest';
import {CarteiraListaComponent } from './carteira';

export const InvestimentoRoutes: Routes = [

    	{ 
		path: 'investimento', 
		component: InvestimentoRoutingComponent,
        canActivate: [AuthGuard] ,
        children: [
		  {
			path: '', 
			component: HomeInvestComponent
		  },
            {
			path: 'carteira', 
			component: CarteiraListaComponent 
                ,outlet:'investimento-outlet'
		  }
		]
    
	} 
];

@NgModule({
  imports: [
    RouterModule.forChild(InvestimentoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InvertimentoRoutingModule {
}
