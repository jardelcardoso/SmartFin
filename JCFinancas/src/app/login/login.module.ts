import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatCardModule,MatExpansionModule} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro';
import { LoginService } from './services/';
import { HomeComponent } from './home';
import { AuthGuard } from '../guards';
import {LoginRoutingComponent} from './login-routing.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
      CommonModule,
      MatCardModule,
      MatExpansionModule,
      RouterModule,
      FormsModule,
      HttpModule,
      LoginRoutingModule
  ],
  declarations: [
      LoginComponent,
      RegistroComponent,
      HomeComponent,
      LoginRoutingComponent
    ],
   providers: [
       AuthGuard,
       LoginService
    ]
})
export class LoginModule { }
