import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login';
import { RegistroComponent } from './registro';
import {HomeComponent} from './home';
import { AuthGuard } from '../guards';
import {LoginRoutingComponent} from './login-routing.component';

export const LoginRoutes: Routes = [

    	{ 
		path: 'login', 
		component: LoginRoutingComponent,
        children: [
		  {
			path: '', 
			component: LoginComponent 
		  }
		]
	} ,

{ 
		path: 'registro', 
		component: RegistroComponent 
	},

/*,
	{ 
		path: 'registro', 
		component: RegistroComponent 
	},
    { 
		path: 'home', 
		component: HomeComponent,
         canActivate: [AuthGuard] 
	}*/
];

@NgModule({
  imports: [
    RouterModule.forChild(LoginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
