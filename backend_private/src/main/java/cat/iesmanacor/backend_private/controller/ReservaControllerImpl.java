package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Reservas;
import cat.iesmanacor.backend_private.services.ReservasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.Optional;

@Controller
public class ReservaControllerImpl {

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    @Autowired
    ReservasService reservasService;

    @Autowired
    RestaurantService restaurantService;

    /////////////         RESERVA FORMULARIOS        ////////////////////

    @RequestMapping(value = "/reserva/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","reserva-create");
        model.addAttribute("object",new Reservas());
        model.addAttribute("array",restaurantService.findAllRestaurants());
        return __route_formularis;
    }

    @RequestMapping(value = "/reserva/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Reservas> reservas = reservasService.findReservaById(id);
            if (reservas.isPresent()) {
                model.addAttribute("type", "reserva-update");
                model.addAttribute("object", reservas.get());
                model.addAttribute("array",restaurantService.findAllRestaurants());
                return __route_formularis;
            }
        }
        model.addAttribute("error","RESERVA SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/reserva/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Reservas reservas, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/reserva/create";
        }

        if (reservas.getId_reserva()!=null) {
            Optional<Reservas> requestReserva = reservasService.findReservaById(reservas.getId_reserva());
            if (requestReserva.isPresent()) {
                model.addAttribute("type","reserva-create");
                model.addAttribute("object",new Reservas());
                model.addAttribute("error","TRYING TO SAVE RESERVA THAT EXIST");
                return show(model);
            }
        }
        saveReserva(reservas);
        return show(model);
    }


    @RequestMapping(value = "/reserva/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Reservas reservas, ModelMap model, Errors errors) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/reservas";
        }

        if (reservas.getId_reserva()!=null) {
            Optional<Reservas> reservasOptional = reservasService.findReservaById(reservas.getId_reserva());
            if (reservasOptional.isPresent()) {
                if (reservas.getId_reserva().equals(reservasOptional.get().getId_reserva())) {
                    updateReserva(reservas);
                } else {
                    model.addAttribute("error","reserva id doesnt match with the actual reserva id");
                }
            } else {
                model.addAttribute("error","reserva id doesnt exit");
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/reservas",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String show(ModelMap model) {
        model.addAttribute("reservas",reservasService.findAllReservass());
        return __route_table;
    }

    @RequestMapping(value = "/reserva/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String findReservaById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Reservas> reservas = reservasService.findReservaById(id);
            if (reservas.isPresent()) {
                model.addAttribute("reserva", reservas.get());
                return __route_table;
            }
        }
        model.addAttribute("error","RESERVA NOT FOUNDED");
        return __route_home;
    }


    /* ------------------------------------------ */


    public void saveReserva(Reservas reservas) {
        if (reservas!=null) {
            reservasService.saveReserva(reservas);
        }
    }

    @RequestMapping(value = "/reserva/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Reservas> reservas = reservasService.findReservaById(id);
            if (reservas.isPresent()) {
                deleteReservaById(id);
            } else {
                model.addAttribute("error", "RESERVA NOT FOUNDED");
            }
        }
        return new RedirectView("/reservas");
    }

    public void deleteReservaById(BigInteger id) {
        restaurantService.deleteRestaurant(id);
    }

    public void updateReserva(Reservas reservasNew) {
        if (reservasNew!=null) {
            reservasService.updateReserva(reservasNew);
        }
    }
    public void inicializeModelMap(ModelMap model) {
        model.remove("factura");
        model.remove("facturas");
        model.remove("error");
    }
}
