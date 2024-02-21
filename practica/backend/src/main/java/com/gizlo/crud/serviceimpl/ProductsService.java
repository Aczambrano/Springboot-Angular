package com.gizlo.crud.serviceimpl;

import com.gizlo.crud.entity.Products;
import com.gizlo.crud.repository.ProductsRepository;
import com.gizlo.crud.service.IProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
/*Definimos esta clase como un servicio implementado por su interface*/
@Service
public class ProductsService implements IProductosService {
    /*
     * Definimos los autowired para la inyección de dependencias en esta clase.
     * En este caso, se utiliza para inyectar el repositorio ProductsRepository.
     */
    @Autowired
    private ProductsRepository repo;
    /*el resto de metodos son metodos basicos que se implementan mediante el
    * Repositorio declarado en ProductsRepository*/

    @Override
    public List<Products> listar() {
        return repo.findAll();
    }
    @Override
    public Products registrar(Products persona) {
        return repo.save(persona);
    }

    @Override
    public Products actualizar(Products persona) {
        return repo.save(persona);
    }

    @Override
    public void eliminar(Integer idPersona) {
        repo.deleteById(idPersona);
    }

    @Override
    public Products listarPorId(Integer idPersona) {
        return repo.findById(idPersona).orElse(null);
    }
    /*Métodos para la implementacion de la paginacion*/
    @Override
    public Page<Products> listaPaginacion(Pageable pageable) {
        return repo.findAll(pageable);

    }
}
