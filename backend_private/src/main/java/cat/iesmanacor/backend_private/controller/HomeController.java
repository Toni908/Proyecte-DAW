package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    @Autowired
    LocalidadService localidadService;

    @Autowired
    ImgService imgService;

    @GetMapping("/home")
    public String getHome(ModelMap model){
        model.addAttribute("restaurantes",restaurantService.findAllRestaurants());
        return "principalPage";
    }


    // ADMIN SECTION DATATABLE RESTAURANTES
    @GetMapping("/restaurante/configuration/admin")
    public String adminRestaurantes(ModelMap model){
        //Condition if is admin
        model.addAttribute("restaurantes",restaurantService.findAllRestaurants());
        model.addAttribute("updateRestaurant",new Restaurant());
        return "restaurantesAdmin";
    }

    @GetMapping("/configuration/cards")
    public String getCards(){
        return "cards";
    }
}
