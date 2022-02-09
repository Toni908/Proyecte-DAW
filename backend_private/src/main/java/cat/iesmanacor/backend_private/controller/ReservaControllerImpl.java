package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.componentes.User;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.ReservasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static cat.iesmanacor.backend_private.componentes.User.getUser;
import static cat.iesmanacor.backend_private.componentes.User.isUserCorrect;

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
    public String reservasForRestaurant(ModelMap model, HttpServletRequest request) {
        Useracount useracount = getUser(request);

        if (isUserCorrect(useracount, useracountService)) {
            model.addAttribute("restaurantesUser", restaurantService.findRestaurantByUseracount(useracount.getId_user()));
            return "reservas";
        }
        return "redirect:/error/401";
    }
}
