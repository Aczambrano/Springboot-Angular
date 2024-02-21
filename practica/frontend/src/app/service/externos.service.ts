import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../model/products';
import { Observable, Subject } from 'rxjs';
//Servicio para obtener los datos de la api externa user
@Injectable({
  providedIn: 'root'
})
export class ExternosService {
  private urlExterna = "https://dummyjson.com"
  usuarioActualizar = new Subject<Products[]>();

  constructor(private httpClient: HttpClient,) { }
  /*
  listar(){
    return this.http.get<Pais[]>(`${this.url + "/listarPais"}`); 
  }*/

  buscarUsuariosExternos(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlExterna + "/users"}`);
  }


}
