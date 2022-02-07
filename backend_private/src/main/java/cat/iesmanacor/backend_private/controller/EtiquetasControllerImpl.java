package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.EtiquetasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.Restaurante_EtiquetasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import static cat.iesmanacor.backend_private.componentes.User.getUser;

@Controller
public class EtiquetasControllerImpl {

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    Restaurante_EtiquetasService restaurante_etiquetasService;

    @Autowired
    RestaurantService restaurantService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/etiquetas/save",method = RequestMethod.POST)
    @Transactional
    public String save(@RequestParam(value = "etiquetas", defaultValue = "") List<String> etiquetas, @RequestParam("idRestaurante") BigInteger id, HttpServletRequest request) {
        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            Useracount user = getUser(request);

            // REMOVE ALL LINKS WITH ETIQUETAS
            if (restaurant.isPresent()) {
                if(user == null || restaurant.get().getUseracount().equals(user)){
                    return "redirect:/error/401";
                }
                deleteEtiquetasRelations(restaurant.get());
                restaurant.ifPresent(value -> cat.iesmanacor.backend_private.componentes.Etiquetas.saveEtiquetas(etiquetas, value, etiquetasService, restaurante_etiquetasService));
                return "redirect:/restaurant/update/" + id;
            } else {
                return "redirect:/error/401";
            }
        } else {
            return "redirect:/error/401";
        }
    }

    /* ------------------------------------------ */

    public void deleteEtiquetasRelations(Restaurant restaurant) {
        List<Restaurante_Etiquetas> restaurante_etiquetas = restaurante_etiquetasService.getRestaurant_EtiquetasFromIdRestaurant(restaurant.getId_restaurante());
        for (Restaurante_Etiquetas restauranteEtiqueta : restaurante_etiquetas) {
            restaurante_etiquetasService.deleteRestaurante_Etiquetas(restauranteEtiqueta.getId());
        }
        deleteEtiquetasNotUsage();
    }

    public void deleteEtiquetasNotUsage() {
        List<Etiquetas> allEtiquetas = etiquetasService.findAllEtiquetas();
        for (Etiquetas allEtiqueta : allEtiquetas) {
            List<Restaurante_Etiquetas> deleteRestaurantEtiquetas = restaurante_etiquetasService.findByIdEtiquetas(allEtiqueta.getId_etiqueta());
            if (deleteRestaurantEtiquetas.isEmpty()) {
                etiquetasService.deleteEtiqueta(allEtiqueta.getId_etiqueta());
            }
        }
    }
}
