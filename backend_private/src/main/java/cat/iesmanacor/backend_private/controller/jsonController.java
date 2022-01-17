package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class jsonController {
    @Autowired
    RestaurantService restaurantService;

    @GetMapping(value = "/get/restaurantes/admin/json/suuu", produces = { "application/json" })
    public List<Restaurant> getRestaurantes(){
        return  restaurantService.findAllRestaurants();
    }
}
