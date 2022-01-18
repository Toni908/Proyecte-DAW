package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Etiquetas;
import cat.iesmanacor.backend_private.entities.Municipios;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.EtiquetasService;
import cat.iesmanacor.backend_private.services.MunicipioService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class jsonController {
    @Autowired
    RestaurantService restaurantService;

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    MunicipioService municipioService;

    @GetMapping(value = "/get/restaurantes/admin/json/suuu", produces = { "application/json" })
    public List<Restaurant> getRestaurantes(){
        return  restaurantService.findAllRestaurants();
    }

    @GetMapping(value = "/get/etiquetas/admin/json", produces = { "application/json" })
    public List<Etiquetas> getEtiquetas(){
        return  etiquetasService.findAllEtiquetas();
    }

    @GetMapping(value = "/get/municipios/admin/json", produces = { "application/json" })
    public List<Municipios> getMunicipios(){
        return  municipioService.findAllMunicipios();
    }
}
