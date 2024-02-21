package com.gizlo.crud.service;

import com.gizlo.crud.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
/*Interfaz de el servicio producto, aqui ponemos nuestros meotodos (en su mayoría CRUD)
que nuestro servicio
* implementará y tambien empezamos a realizar la paginacion*/
public interface IProductosService {
    List<Products> listar();
    Products registrar(Products persona);
    Products actualizar (Products persona);
    void eliminar (Integer idPersona);
    Products listarPorId(Integer idPersona);

    Page<Products> listaPaginacion(Pageable pageable);
}
