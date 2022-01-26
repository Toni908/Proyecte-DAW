package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Etiquetas;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Restaurante_Etiquetas;
import cat.iesmanacor.backend_private.entities.Restaurante_EtiquetasId;
import cat.iesmanacor.backend_private.services.EtiquetasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.Restaurante_EtiquetasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class EtiquetasControllerImpl {

    private final String __route_formulari_create = "formularios/restaurante-create";
    private final String __route_formulari_update = "formularios/restaurante-update";

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    Restaurante_EtiquetasService restaurante_etiquetasService;

    @Autowired
    RestaurantService restaurantService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/etiquetas/save",method = RequestMethod.POST)
    @Transactional
    public String save(@RequestParam(value = "etiquetas", defaultValue = "") List<String> etiquetas, @RequestParam("idRestaurante") BigInteger id, ModelMap model) {
        inicializeModelMap(model);

        if (id!=null) {
            Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
            // REMOVE ALL LINKS WITH ETIQUETAS
            if (restaurant.isPresent()) {
                deleteEtiquetasRelations(restaurant.get());
                if (!etiquetas.equals("null")) {
                    restaurant.ifPresent(value -> saveEtiquetas(etiquetas, value));
                }
                return "redirect:/restaurant/update/" + id;
            }
        }
        return __route_formulari_update;
    }

    /* ------------------------------------------ */

    public void inicializeModelMap(ModelMap model) {
        model.remove("etiqueta");
        model.remove("etiquetas");
        model.remove("error");
    }

    public void saveEtiquetas(List<String> myArray, Restaurant restaurant) {
        List<Etiquetas> etiquetas = stringToArrayOfEtiquetas(myArray);
        for (Etiquetas etiqueta : etiquetas) {
            Restaurante_Etiquetas restaurante_etiquetas = new Restaurante_Etiquetas();
            Restaurante_EtiquetasId restaurante_etiquetasId = new Restaurante_EtiquetasId();

            if (checkNameEtiquetasIsEmpty(etiqueta)) {
                etiquetasService.saveEtiqueta(etiqueta);
                restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiqueta);
            } else {
                List<Etiquetas> etiquetaFound = etiquetasService.findEtiquetaByName(etiqueta.getNombre());
                if (etiquetaFound!=null) {
                    restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiquetaFound.get(0));
                }
            }
            restaurante_etiquetas.setId(restaurante_etiquetasId);
            restaurante_etiquetasService.saveRestaurante_Etiquetas(restaurante_etiquetas);
        }
    }
    public List<Etiquetas> stringToArrayOfEtiquetas(List<String> myArray) {
        List<Etiquetas> etiquetas = new ArrayList<>();
        for (String s : myArray) {
            etiquetas.add(new Etiquetas(null, s));
        }
        return etiquetas;
    }
    public boolean checkNameEtiquetasIsEmpty(Etiquetas etiquetas) {
        if (etiquetas.getNombre()!=null) {
            return etiquetasService.findEtiquetaByName(etiquetas.getNombre()).isEmpty();
        }
        return false;
    }

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
