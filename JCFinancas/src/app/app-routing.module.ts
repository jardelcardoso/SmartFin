import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { LoginRoutes } from './login';
import { AuthGuard } from './guards';
import {HomeComponent} from './components/home';
import {LoginComponent} from './login';
import {InvestimentoRoutingComponent} from './investimento';

export const routes: Routes = [
	{ 
		path: '', 
		redirectTo: '/home', 
		pathMatch: 'full'  ,
         canActivate: [AuthGuard] 
        
        
    } ,
    {path: 'home', 
		component: HomeComponent,
         canActivate: [AuthGuard] 
    } /*,
    {path: 'investimento', 
		component: InvestimentoRoutingComponent,
         canActivate: [AuthGuard] 
    }*/
//,	...LoginRoutes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}