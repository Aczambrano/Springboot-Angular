import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/Usuario/User';
import { ProductoExterno } from 'src/app/model/productoExterno';
import { Products } from 'src/app/model/products';
import { ExternosService } from 'src/app/service/externos.service';
import { ProductsService } from 'src/app/service/products.service';
import { ModalInformacionComponent } from '../../layouts/modal-informacion/modal-informacion.component';
import { LoginUsuario } from 'src/app/model/login';
import { TokenService } from 'src/app/service/security/token.service';
import { AuthService } from 'src/app/service/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*
  Componente donde se muestra el login de la pagina
*/

export class LoginComponent implements OnInit {
  //añadiduras de variables
  users: User[];
  usersLista: { users: User[] };
  loginForm: FormGroup;

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    //private toastr: ToastrService,
    private fb: FormBuilder,
    private externosService: ExternosService,
    private route: Router,
    private dialog: MatDialog
  ) {

  }
  /*meotodo que nos permite cargar todo lo mencionado dentro de este cuando se inicia 
  el componente*/
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.obtenerDatosUsuarioExterno()

  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.loginForm.value.username,
      this.loginForm.value.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        /*
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });*/
        this.route.navigate(['/crud']);
      },
      err => {
        this.isLogged = false;
        //this.errMsj = err.error.message;
        /*
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });*/
        console.log(err );
        this.accesoDenegado()
      }
    );
  }
  /*meotodo que nos permite obtener los datos de la api externa de usuarios*/
  obtenerDatosUsuarioExterno() {
    this.externosService.buscarUsuariosExternos().subscribe(
      p => {
        this.usersLista = p;
      },
      error => {
        console.log('Error al obtener la lista de productos externos:', error);
      }
    );
  }

  /*meotodo que nos permite hacer la validacion de usuario y contraseña*/
  buscarProductoPorUsuarioPassword(usuario: string, password: string): User | undefined {

    console.log("Datos de usuarios:", this.usersLista.users);


    for (let a of this.usersLista.users) {

      if (a.username == usuario && a.password == password) {
        console.log("este es el registro", a)
        return a;
      }
    }
    return undefined;
  }


  /*meotodo que redirige en caso de ser valido o sino muestra un mensaje de ingreso incorrecto*/

  login() {
    const usuarioCorrecto = this.buscarProductoPorUsuarioPassword(this.loginForm.value.username,
      this.loginForm.value.password);
    if (usuarioCorrecto) {

      this.route.navigate(['/crud'], {
        queryParams: {
          nombre: usuarioCorrecto.firstName,
          apellido: usuarioCorrecto.lastName,
          foto: usuarioCorrecto.image
        },
      });

    } else {
      this.accesoDenegado()
    }
  }

  accesoDenegado() {
    this.dialog.open(ModalInformacionComponent, {
      maxWidth: '400px',
      maxHeight: '400px',
      data: { mensaje: "Datos Incorrectos" }
    })
  }

}
