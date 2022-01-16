package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    RestaurantService restaurantService;

    @GetMapping("/home")
    public String getHome(ModelMap model){
        model.addAttribute("restaurantes",restaurantService.findAllRestaurants());
        return "principalPage";
    }

    @GetMapping("/configuration/cards")
    public String getCards(){
        return "cards";
    }
}
