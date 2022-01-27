package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Reservas;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.ReservasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Controller
public class ReservaControllerImpl {

    @Autowired
    ReservasService reservasService;

    @Autowired
    RestaurantService restaurantService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/reservas/{id}",method = RequestMethod.GET)
    public String reservasForRestaurant(@PathVariable BigInteger id) {
        if (id!=null) {
            return "reservasRestaurante";
        }
        return "home";
    }

    @GetMapping(value = "/get/reservas/json/{id}", produces = { "application/json" })
    public List<Reservas> getSingleRestaurantMembresia(@PathVariable BigInteger id){
        return reservasService.findReservasByIdRestaurante(id);
    }
}
