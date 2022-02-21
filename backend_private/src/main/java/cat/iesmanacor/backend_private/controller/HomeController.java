package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    @Autowired
    ImgService imgService;

    @GetMapping("/")
    public String getHome(ModelMap model){
        model.addAttribute("restaurantes",restaurantService.findAllRestaurants());
        return "redirect:/login";
    }


    @GetMapping("/configuration/cards")
    public String getCards(){
        return "cards";
    }
}
