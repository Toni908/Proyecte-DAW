package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.apache.catalina.User;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Controller
public class HomeController {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    @GetMapping("/home")
    public String getHome(ModelMap model){
        model.addAttribute("restaurantes",restaurantService.findAllRestaurants());
        return "principalPage";
    }

    @GetMapping("/lista/restaurantes")
    public String userRestaurant(@ModelAttribute Session session, ModelMap model){
        List<Useracount> useracount = useracountService.findAllUseracount();
        model.addAttribute("restaurantesUser",restaurantService.findRestaurantByUseracount(useracount.get(1).getId_user()));
        return "listRestaurants";
    }

    @GetMapping("/configuration/cards")
    public String getCards(){
        return "cards";
    }
}
