import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalEliminarComponent } from '../../layouts/modal-eliminar/modal-eliminar.component';
import { Products } from 'src/app/model/products';
import { ProductsService } from 'src/app/service/products.service';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { ProductoExterno } from 'src/app/model/productoExterno';
import { ProductoExternoComponent } from '../producto-externo/producto-externo.component';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/service/security/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})

/*
  Componente donde se muestra el registro de los productos que estan
  en nuestra base de datos, este componente tiene paginacion,
  un pequeño login, filtros y llama a mas metodos para hacer los 
  procesos CRUD
*/

export class ListarProductoComponent implements OnInit {
  //declaracion de variables

  dataSource: MatTableDataSource<Products>;
  displayedColumns: string[] = [
    'Nro',
    'nombre',
    'descripcion',
    'cantidad',
    'precio',
    'marca',
    'categoria',
    'imagen',
    'Acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLogged = false;
  isAdmin = false;
  products: Products[];
  productosExternos: ProductoExterno[];
  cantidad: number = 0;
  indicePaginacion = 0;
  cantidadPaginacion = 10;
  nombre: string
  apellido: string
  foto: string


  constructor(private productsService: ProductsService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService,

    ) {

  }
   /*meotodo que nos permite cargar todo lo mencionado dentro de este cuando se inicia 
  el componente*/

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;

    }else{
      this.isLogged = false;
    }

    this.isAdmin = this.tokenService.isAdmin();
    
 /*aqui pasamos por rutas algunos parametros del usuario*/
    this.router.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
      this.foto = params['foto'];

    });
    this.obtenerDatosProducto(this.indicePaginacion, this.cantidadPaginacion)
    this.productsService.productoActualizar.subscribe(d => {
      this.dataSource = new MatTableDataSource(d);
    })
  }

/*metodo que nos permite obtener los datos de la tabla productos
    */
  obtenerDatosProducto(index: number, cantidad: number) {
    this.productsService.paginacion(index, cantidad).subscribe(
      p => {
        this.cantidad = p.totalElements;
        this.dataSource = new MatTableDataSource(p.content);
        this.dataSource.sort = this.sort;
        console.log("Elementos traidos", this.dataSource)
      },
      error => {
        console.log('Error al obtener la lista de productos:', error);
      }
    );
  }


 /*metodo que nos permite llamar a otro componente el cual 
 tiene un pequeño formulario donde te pregunta si eliminar un registro o no
    */
  openModalDelete(mensaje: string): Observable<string> {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      disableClose: true,
      data: { mensaje: mensaje }
    });
    return dialogRef.afterClosed();
  }

  /*metodo que nos permite llamar a otro componente el cual 
 tiene un pequeño formulario donde puedes agregar un producto
    */

  agregar() {
    this.dialog.open(AgregarProductoComponent, {
      maxWidth: '800px',
      maxHeight: '700px',
      data: { mensaje: "Agregar un nuevo Producto" }
    })
  }

  /*metodo que nos permite llamar a otro componente el cual 
 tiene un pequeño formulario donde puedes agregar un producto externo
    */

  productoExterno() {
    this.dialog.open(ProductoExternoComponent, {
      maxWidth: '800px',
      data: { mensaje: "Agregar un nuevo Producto Externoo" },
    })
  }

  /*metodo que nos permite llamar a otro componente el cual 
 tiene un pequeño formulario donde puedes editar un producto
    */

  editar(producto?: Products) {
    let product = producto != null ? producto : new Products()
    this.dialog.open(EditarProductoComponent, {
      maxWidth: '800px',
      maxHeight: '700px',
      data: product
    })
  }

  eliminar(id: number) {
    this.openModalDelete('¿Desea Eliminar el Registro?').subscribe(result => {
      if (result) {
        this.productsService.eliminar(id).subscribe(
          () => {
            // Manejar la eliminación exitosa
            console.log('Registro eliminado correctamente');
            this.toastr.error("", 'Datos Eliminados Correctamente', {
              timeOut: 3000,  positionClass: 'toast-bottom-left',
            });
            this.obtenerDatosProducto(this.indicePaginacion, this.cantidadPaginacion);
          },
          (error) => {
            // Manejar el error en caso de que ocurra
            console.error('Error al eliminar el registro', error);
          }
        );
      }
    });

  }


  deshabilitar(id: number) {
    this.openModalDelete('¿Desea Eliminar el Registro?').subscribe(result => {
      if (result) {
        this.productsService.deshabilitar(id).subscribe(
          () => {
            // Manejar la eliminación exitosa
            console.log('Registro eliminado correctamente');
            this.toastr.error("", 'Datos Eliminados Correctamente', {
              timeOut: 3000,  positionClass: 'toast-bottom-left',
            });
            this.obtenerDatosProducto(this.indicePaginacion, this.cantidadPaginacion);
          },
          (error) => {
            // Manejar el error en caso de que ocurra
            console.error('Error al eliminar el registro', error);
          }
        );
      }
    });

  }

  /*metodo para filtrar la tabla mediante un input
    */

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* metodo que nos permite paginar los datos de la tabla*/
  paginador(event: any) {
    this.obtenerDatosProducto(event.pageIndex, event.pageSize);
    /*this.personaService.paginacion(event.pageIndex,event.pageSize).subscribe(
      p => {
        this.cantidad = p.totalElements;
        this.dataSource = new MatTableDataSource(p.content);
        this.dataSource.sort = this.sort;
        console.log("Elementos por paginador metodo", this.dataSource)
      },
      error => {
        console.log('Error al obtener la lista de personas:', error);
      }
    );*/
  }
}
