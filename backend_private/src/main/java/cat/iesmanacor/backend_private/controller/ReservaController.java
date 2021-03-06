package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.configuration.MvnConfiguration;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.ReservasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.Optional;

import static cat.iesmanacor.backend_private.componentes.User.getUser;
import static cat.iesmanacor.backend_private.componentes.User.isUserCorrect;

@Controller
public class ReservaController {

    @Autowired
    ReservasService reservasService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/reservas",method = RequestMethod.GET)
    public String reservas(ModelMap model, HttpServletRequest request) {
        Useracount useracount = getUser(request);
        MvnConfiguration mvnConfiguration = new MvnConfiguration();
        String lang = String.valueOf(mvnConfiguration.localeResolver().resolveLocale(request));

        if (isUserCorrect(useracount, useracountService)) {
            model.addAttribute("restaurantesUser", restaurantService.findRestaurantByUseracount(useracount.getId_user()));
            model.addAttribute("idioma",lang);
            return "reservas";
        }
        return "redirect:/error/401";
    }

    @RequestMapping(value = "/reservas/{id}",method = RequestMethod.GET)
    public String reservasForRestaurant(@PathVariable BigInteger id, ModelMap model, HttpServletRequest request) {
        Useracount useracount = getUser(request);
        MvnConfiguration mvnConfiguration = new MvnConfiguration();
        String lang = String.valueOf(mvnConfiguration.localeResolver().resolveLocale(request));

        if (isUserCorrect(useracount, useracountService)) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("actualRestaurant",restaurant.get());
                model.addAttribute("restaurantesUser", restaurantService.findRestaurantByUseracount(useracount.getId_user()));
                model.addAttribute("idioma",lang);
            }
            return "reservas";
        }
        return "redirect:/error/401";
    }
}
