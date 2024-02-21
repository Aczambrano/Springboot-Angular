import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ProductoExterno } from 'src/app/model/productoExterno';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-producto-externo',
  templateUrl: './producto-externo.component.html',
  styleUrls: ['./producto-externo.component.css']
})

/*
  Componente donde se muestra el formulario para agregar un producto externo
*/

export class ProductoExternoComponent implements OnInit {

    //declaracion de variables


  productoSeleccionado: number;
  myForm: FormGroup;
  selectedPais: string
  productos: Products
  productpexternoArray: ProductoExterno[]; // Ahora es un array de productos
  productosExternosLista: { products: ProductoExterno[] };

  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<ProductoExternoComponent>) {
    this.productos = new Products();
    this.productpexternoArray = [];
  }
 /*meotodo que nos permite cargar todo lo mencionado dentro de este cuando se inicia 
  el componente*/
  ngOnInit() {
    this.initializeForm()
    //this.obtenerDatosPais()
    this.obtenerDatosProductoExterno()
  }
  initializeForm() {
  
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required]
    });
  }

  enviarSolicitud = false;

    /*metodo que nos permite guardar los datos del formulario siempre
      y cuando el formulario sea valido*/
  guardar() {
    if (!this.enviarSolicitud) {
      this.enviarSolicitud = true;
      const productoSeleccionado2 = this.buscarProductoPorId(this.productoSeleccionado);



      if (productoSeleccionado2) {
        // Puedes procesar o modificar el producto seleccionado antes de guardarlo
       
        const productoParaGuardar:Products = {
          id:0,
          nombre: productoSeleccionado2.title,
          descripcion: productoSeleccionado2.description,
          cantidad: productoSeleccionado2.stock,
          precio: productoSeleccionado2.price,
          marca: productoSeleccionado2.brand,
          categoria: productoSeleccionado2.category,
          imagen: productoSeleccionado2.thumbnail,
        };
                this.productsService.guardar(productoParaGuardar)
                  .subscribe(() => {
                    // Emitir una notificación para actualizar el listado de componentes
                    return this.obtenerDatosProducto();
                  });
                this.cancelar(true);
      }
    }
  }

   /*metodo que nos permite obtener los datos de la tabla productos
    */

  obtenerDatosProducto() {
    this.productsService.listar().subscribe(
      p => {
        this.productsService.productoActualizar.next(p);
      },
      error => {
        console.log('Error al obtener la lista de productos:', error);
      }
    );
  }

   /*metodo que nos permite obtener los datos de la api externa
   mediante el id
    */
  buscarProductoPorId(id: number): ProductoExterno | undefined {
   
    for(let a of this.productosExternosLista.products){

      if(a.id==id){
            return a;
        }
    }
    return undefined;
  }

  
  /*metodo que nos permite obtener los datos de la api externa de productos
    */
  obtenerDatosProductoExterno() {
    this.productsService.buscarProductosExternos().subscribe(
      p => {
        this.productosExternosLista = p;
        this.productpexternoArray = p.products; // Asigna el array de productos a la propiedad
      },
      error => {
        console.log('Error al obtener la lista de productos externos:', error);
      }
    );
  }

    
 /*metodo que nos permite llamar a otro componente el cual 
 tiene un pequeño formulario donde te pregunta si cancelas o no
    */
  cancelar(confirmacion: boolean) {

    this.dialogRef.close(confirmacion);

  }
}
