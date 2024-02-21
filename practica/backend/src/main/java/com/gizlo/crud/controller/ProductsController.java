package com.gizlo.crud.controller;

import com.gizlo.crud.entity.Products;
import com.gizlo.crud.service.IProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*Controller de productos para poder gestionar las solicitudes http*/
@RestController
@CrossOrigin()
@RequestMapping("/products")
public class ProductsController {
    @Autowired
    private IProductosService service;
    /* Método para listar todos los productos */
    @GetMapping("/listar")
    public ResponseEntity<List<Products>> listarProducts(){
        List<Products> obj = service.listar();
        return new ResponseEntity<List<Products>>(obj, HttpStatus.OK);
    }
    /* Método para registrar un nuevo producto */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/registrar")
    public ResponseEntity<Products> registrarProducts(@RequestBody Products productos){
        Products obj = service.registrar(productos);
        return new ResponseEntity<Products>(obj, HttpStatus.OK);
    }
    /* Método para actualizar un producto por su ID */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Products> actualizarProducts(@PathVariable Integer id, @RequestBody Products products){

        Products productsActual = service.listarPorId(id);
        /*Hacemos las respectivas validaciones y mapeamos los datos*/
        if(productsActual!=null){
            productsActual.setNombre(products.getNombre());
            productsActual.setDescripcion(products.getDescripcion());
            productsActual.setCantidad(products.getCantidad());
            productsActual.setPrecio(products.getPrecio());
            productsActual.setMarca(products.getMarca());
            productsActual.setCategoria(products.getCategoria());
            productsActual.setImagen(products.getImagen());
            // Guarda y devuelve el producto actualizado

            Products productsEnviada = service.actualizar(productsActual);
            return new ResponseEntity<Products>(productsEnviada,HttpStatus.OK);
        }else{
            // Si no encuentra el producto, devuelve un HttpStatus.NOT_FOUND

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /* Método para eliminar un producto por su ID */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarProducts(@PathVariable Integer id){
        Products obj = service.listarPorId(id);
        if (obj !=null){
            // Elimina el producto y devuelve HttpStatus.NO_CONTENT

            service.eliminar(id);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }else{
            // Si no encuentra el producto, devuelve un HttpStatus.NOT_FOUND

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    /* Método para listar un producto por su ID */

    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<Products> listarProductsPorId(@PathVariable Integer id) throws Exception{
        //validamos que el objeto exista
        Products obj = service.listarPorId(id);
        if (obj !=null){
            // Si encuentra el producto, devuelve HttpStatus.OK

            return new ResponseEntity<Products>(obj,HttpStatus.OK);
        }else{
            throw new Exception("No se encontró ningun producto");
        }
    }

    /* Método para paginación de productos */
    @GetMapping(value = "/paginacion")
    public ResponseEntity<Page<Products>> listaPaginacion(Pageable pageable){
        // Obtiene una página de productos según la paginación especificada
        Page<Products> persona = service.listaPaginacion(pageable);
        return new ResponseEntity<Page<Products>>(persona,HttpStatus.OK);
    }

}
