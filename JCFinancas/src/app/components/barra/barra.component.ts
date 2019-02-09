import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
    
    logout(){
        delete sessionStorage.token;
        this.router.navigate(["/login"]);
    }

}
