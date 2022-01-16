package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.RestaurantControllers;
import cat.iesmanacor.backend_private.entities.Localidad;
import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.LocalidadService;
import cat.iesmanacor.backend_private.services.MembresiaService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
public class RestaurantControllerImpl implements RestaurantControllers {
    @Autowired
    RestaurantService restaurantService;

    @Autowired
    UseracountService useracountService;

    @Autowired
    MembresiaService membresiaService;

    @Autowired
    LocalidadService localidadService;


    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    //////////////         RESTAURANTES   FORMULARIOS      ////////////////////

    @RequestMapping(value = "/restaurant/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","restaurant-create");
        model.addAttribute("object",new Restaurant());
        model.addAttribute("array",getRelationsWithRestaurant());
        return __route_formularis;
    }

    @RequestMapping(value = "/restaurant/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("type", "restaurant-update");
                model.addAttribute("object", restaurant.get());
                model.addAttribute("array", getRelationsWithRestaurant());
                return __route_formularis;
            }
        }
        model.addAttribute("error","RESTAURANT SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         RESTAURANTES   ACTIONS      ////////////////////

    @RequestMapping(value = "/restaurant/save")
    public String save(@ModelAttribute @Valid Restaurant restaurant, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/restaurant/create";
        }
        String validation = checkRelationsExist(restaurant);
        if (!validation.equals("OK")) {
            model.addAttribute("error",validation);
            return __route_home;
        }

        if (checkNameisEmpty(restaurant.getNombre())) {
            if (checkMembresiaisEmpty(restaurant.getMembresia().getId_membresia())) {
                saveRestaurant(restaurant);
            } else {
                model.addAttribute("error","membresia relation is already taken");
            }
        } else {
            model.addAttribute("error","name for your restaurant already taken");
        }
        return show(model);
    }

    @RequestMapping(value = "/restaurant/put")
    public String put(@ModelAttribute @Valid Restaurant restaurant, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/restaurants";
        }

        String validation = checkRelationsExist(restaurant);
        if (!validation.equals("OK")) {
            model.addAttribute("error",validation);
            return __route_home;
        }

        if (restaurant.getId_restaurante()!=null) {
            Optional<Restaurant> restaurantBefore = restaurantService.findRestaurantById(restaurant.getId_restaurante());
            if (restaurantBefore.isPresent()) {
                model = checkToUpdate(restaurant, restaurantBefore.get(), model);
            } else {
                return "redirect:/restaurants";
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/restaurants", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String show(ModelMap model) {
        model.addAttribute("restaurants",restaurantService.findAllRestaurants());
        return __route_table;
    }

    @RequestMapping(value = "/restaurant/{id}", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String getRestaurantById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                model.addAttribute("restaurant", restaurant.get());
                return __route_table;
            }
        }
        model.addAttribute("error","RESTAURANT NOT FOUNDED");
        return __route_home;
    }

    /* ------------------------------------------ */

    @Override
    public void saveRestaurant(Restaurant restaurant) {
        restaurantService.saveRestaurant(restaurant);
    }

    @RequestMapping(value = "/restaurant/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    @Override
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            if (restaurant.isPresent()) {
                restaurantService.deleteRestaurant(id);
            } else {
                model.addAttribute("error", "LOCALIDAD NOT FOUNDED");
            }
        }
        return new RedirectView("/restaurants");
    }

    @Override
    public void updateRestaurant(Restaurant restaurantNew) {
        restaurantService.updateRestaurant(restaurantNew);
    }

    public String checkRelationsExist(Restaurant restaurant) {
        if (restaurant.getMembresia().getId_membresia() !=null
                && restaurant.getLocalidad().getId_localidad() !=null
                && restaurant.getUseracount().getId_user() !=null) {
            Optional<Localidad> localidad = localidadService.findLocalidadById(restaurant.getLocalidad().getId_localidad());
            Optional<Membresia> membresia = membresiaService.findMembresiaById(restaurant.getMembresia().getId_membresia());
            Optional<Useracount> useracount = useracountService.findUseracountById(restaurant.getUseracount().getId_user());

            if (localidad.isEmpty()) {
                return "LOCALIDAD IS NOT PRESENT";
            }
            if (membresia.isEmpty()) {
                return "MEMBRESIA IS NOT PRESENT";
            }
            if (useracount.isEmpty()) {
                return "USERACOUNT IS NOT PRESENT";
            }
        }
        return "OK";
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("restaurant");
        model.remove("restaurants");
        model.remove("error");
    }

    public List<Object> getRelationsWithRestaurant() {
        List<Localidad> localidads = localidadService.findAllLocalidad();
        List<Membresia> membresias = membresiaService.findAllMembresia();
        List<Useracount> useracounts = useracountService.findAllUseracount();

        ArrayList<Object> all = new ArrayList<>();

        all.add(localidads);
        all.add(membresias);
        all.add(useracounts);
        return all;
    }

    public boolean checkNameisEmpty(String name) {
        return restaurantService.findRestaurantByNombre(name).isEmpty();
    }

    public boolean checkMembresiaisEmpty(BigInteger id) {
        return restaurantService.findRestaurantById_Membresia(id).isEmpty();
    }

    public boolean isNameRestaurantTaken(Restaurant restaurant, Restaurant restaurantBefore) {
        if (restaurant.getNombre()!=null) {
            if (restaurant.getNombre().equals(restaurantBefore.getNombre())) {
                return false;
            } else return !checkNameisEmpty(restaurant.getNombre());
        }
        return true;
    }
    public boolean isMembresiaRestaurantTaken(Restaurant restaurant, Restaurant restaurantBefore) {
        if (restaurant.getMembresia().getId_membresia()!=null) {
            if (restaurant.getMembresia().getId_membresia().equals(restaurantBefore.getMembresia().getId_membresia())) {
                return false;
            } else return !checkMembresiaisEmpty(restaurant.getMembresia().getId_membresia());
        }
        return true;
    }

    public ModelMap checkToUpdate(Restaurant restaurant, Restaurant restaurantBefore, ModelMap model) {
        if (isNameRestaurantTaken(restaurant,restaurantBefore)) {
            model.addAttribute("error","name restaurant is taken");
            return model;
        }
        if (isMembresiaRestaurantTaken(restaurant,restaurantBefore)) {
            model.addAttribute("error","membresia relation is taken");
            return model;
        }
        updateRestaurant(restaurant);
        return model;
    }
}
