import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/security/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

/*
  Componente donde añadimos un toolbar para poder ser utilizado en la pagina
*/

export class ToolbarComponent implements OnInit {

  nombre = "Productos"
  isLogged = false;
  constructor(
    private route: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
  }

  onLogOut() {
    this.tokenService.logOut();
  }

  login(){
    this.route.navigate(['/login'])
  }
}
