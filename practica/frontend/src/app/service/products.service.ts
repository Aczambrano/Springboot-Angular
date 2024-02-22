import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../model/products';
import { Observable, Subject } from 'rxjs';

//Servicio para obtener los datos de la api de la bdd interna
//Este servicio nos permite realizar los metodos crud y tambien la paginacion
//Adicional tambien se obtiene datos de la api externa para productos

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = "http://localhost:8080/products"
  private urlExterna = "https://dummyjson.com"
  
  productoActualizar = new Subject<Products[]>();


  constructor(private httpClient: HttpClient,) { }

  listar(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.url + "/listar"}`);
  }
  listarActivos(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.url + "/listarActivos"}`);
  }
  buscarProductosExternos(): Observable<any> {
    return this.httpClient.get<any>(`${this.urlExterna + "/products"}`);
  }
  guardar(parametros: Products): Observable<Object> {
    return this.httpClient.post(`${this.url + "/registrar"}`, parametros)
  }
  paginacion(pagina:number, tamaño:number):Observable<any>{
    return this.httpClient.get<any>(`${this.url}/paginacion?page=${pagina}&size=${tamaño}`)
  }

  modificar(id: number, parametros: Products): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/actualizar/${id}`, parametros)
  }
  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/eliminar/${id}`, { responseType: 'text' });
  }

  deshabilitar(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/deshabilitar/${id}`, { responseType: 'text' });
  }
}
