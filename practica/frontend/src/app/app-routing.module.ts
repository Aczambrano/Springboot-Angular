import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoExternoComponent } from './view/Products/producto-externo/producto-externo.component';
import { ListarProductoComponent } from './view/Products/listar-producto/listar-producto.component';
import { LoginComponent } from './view/auth/login/login.component';
import { RegistroComponent } from './view/auth/registro/registro.component';
import { GuardsService } from './service/security/guards.service';


  
 /*Manejo de rutas de nuestra aplicacion web  */

const routes: Routes = [
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'crud', component: ListarProductoComponent, canActivate: [GuardsService],
   data: { expectedRol: ['admin', 'user'] }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
