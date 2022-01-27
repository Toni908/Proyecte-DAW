package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RestController
public class jsonController {
    @Autowired
    RestaurantService restaurantService;

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    MunicipioService municipioService;

    @Autowired
    LocalidadService localidadService;

    @Autowired
    MembresiaService membresiaService;

    @Autowired
    ReservasService reservasService;

    @GetMapping(value = "/get/restaurantes/admin/json")
    public List<Restaurant> getRestaurantes(){
        return restaurantService.findAllRestaurants();
    }

    @GetMapping(value = "/get/etiquetas/admin/json", produces = { "application/json" })
    public List<Etiquetas> getEtiquetas(){
        return  etiquetasService.findAllEtiquetas();
    }

    @GetMapping(value = "/get/municipios/admin/json", produces = { "application/json" })
    public List<Municipios> getMunicipios(){
        return  municipioService.findAllMunicipios();
    }

    @GetMapping(value = "/get/localidades/admin/json", produces = { "application/json" })
    public List<Localidad> getLocalidades(){
        return  localidadService.findAllLocalidad();
    }

    @GetMapping(value = "/get/membresia/admin/json", produces = { "application/json" })
    public List<Membresia> getMembresias(){
        return  membresiaService.findAllMembresia();
    }

    @GetMapping(value = "/get/membresia/admin/json/{id}", produces = { "application/json" })
    public Membresia getSingleRestaurantMembresia(@PathVariable BigInteger id){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        return restaurant.map(Restaurant::getMembresia).orElse(null);
    }

    @GetMapping(value = "/get/reservas/json/{id}", produces = { "application/json" })
    public List<Reservas> getReservasForRestaurant(@PathVariable BigInteger id){
        return reservasService.findReservasByIdRestaurante(id);
    }
}
