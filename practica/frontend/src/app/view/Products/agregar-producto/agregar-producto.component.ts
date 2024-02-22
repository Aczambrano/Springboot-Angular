import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})

/*
  Componente donde se muestra el formulario para agregar un producto
*/

export class AgregarProductoComponent implements OnInit {
  //declaracion de variables

  myForm: FormGroup;
  selectedPais: string
  products: Products
  constructor(private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastr: ToastrService,
    
    private dialogRef: MatDialogRef<AgregarProductoComponent>) { 
      this.products = new Products();
    }
 /*meotodo que nos permite cargar todo lo mencionado dentro de este cuando se inicia 
  el componente*/
  ngOnInit() {
    this.initializeForm() 
    //this.obtenerDatosPais()
  }
  initializeForm() {
    
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^-?\d+$/)]],
      precio: ['',[Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  enviarSolicitud = false;

      /*metodo que nos permite guardar los datos del formulario siempre
      y cuando el formulario sea valido*/

  guardar() {
    if (this.myForm.valid  && !this.enviarSolicitud) {
      this.enviarSolicitud = true;
      // Procesar los datos del formulario
      this.products.nombre = this.myForm.value.nombre;
      this.products.descripcion = this.myForm.value.descripcion;
      this.products.cantidad = this.myForm.value.cantidad;
      this.products.precio = this.myForm.value.precio
      this.products.marca = this.myForm.value.marca;
      this.products.categoria = this.myForm.value.categoria;
      this.products.imagen = this.myForm.value.imagen
      this.products.estado =  'a'
      console.log("enviado", this.products)
      

      this.productsService.guardar(this.products)
        .subscribe(() => {
          this.toastr.success("", 'Datos Agregados Correctamente', {
            timeOut: 3000,  positionClass: 'toast-bottom-left',
          });
          // Emitir una notificación para actualizar el listado de componentes
          return this.obtenerDatosProducto();
        });
        this.cancelar(true);

    }
  }
    /*metodo que nos permite obtener los datos de la tabla productos
    */

  obtenerDatosProducto() {
    this.productsService.listarActivos().subscribe(
      p => {
        this.productsService.productoActualizar.next(p);
      },
      error => {
        console.log('Error al obtener la lista de productos:', error);
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