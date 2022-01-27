package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Reservas;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.ReservasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
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

    @Autowired
    UseracountService useracountService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/reservas",method = RequestMethod.GET)
    public String reservasForRestaurant(ModelMap model) {
        List<Useracount> useracount = useracountService.findAllUseracount();
        if (useracount.get(1)!=null) {
            model.addAttribute("restaurantesUser",restaurantService.findRestaurantByUseracount(useracount.get(1).getId_user()));
            return "reservasRestaurante";
        }
        return "home";
    }
}
