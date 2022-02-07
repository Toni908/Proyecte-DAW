package cat.iesmanacor.backend_private.componentes;

import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.entities.Restaurante_Etiquetas;
import cat.iesmanacor.backend_private.entities.Restaurante_EtiquetasId;
import cat.iesmanacor.backend_private.services.EtiquetasService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import cat.iesmanacor.backend_private.services.Restaurante_EtiquetasService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class Etiquetas {

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    Restaurante_EtiquetasService restaurante_etiquetasService;

    public static void saveEtiquetas(List<String> myArray, Restaurant restaurant, EtiquetasService etiquetasService, Restaurante_EtiquetasService restaurante_etiquetasService) {
        List<cat.iesmanacor.backend_private.entities.Etiquetas> etiquetas = stringToArrayOfEtiquetas(myArray);
        for (cat.iesmanacor.backend_private.entities.Etiquetas etiqueta : etiquetas) {
            Restaurante_Etiquetas restaurante_etiquetas = new Restaurante_Etiquetas();
            Restaurante_EtiquetasId restaurante_etiquetasId = new Restaurante_EtiquetasId();

            if (checkNameEtiquetasIsEmpty(etiqueta, etiquetasService)) {
                etiquetasService.saveEtiqueta(etiqueta);
                restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiqueta);
            } else {
                List<cat.iesmanacor.backend_private.entities.Etiquetas> etiquetaFound = etiquetasService.findEtiquetaByName(etiqueta.getNombre());
                if (etiquetaFound!=null) {
                    restaurante_etiquetasId = new Restaurante_EtiquetasId(restaurant, etiquetaFound.get(0));
                }
            }
            restaurante_etiquetas.setId(restaurante_etiquetasId);
            restaurante_etiquetasService.saveRestaurante_Etiquetas(restaurante_etiquetas);
        }
    }
    public static List<cat.iesmanacor.backend_private.entities.Etiquetas> stringToArrayOfEtiquetas(List<String> myArray) {
        List<cat.iesmanacor.backend_private.entities.Etiquetas> etiquetas = new ArrayList<>();
        for (String s : myArray) {
            etiquetas.add(new cat.iesmanacor.backend_private.entities.Etiquetas(null, s));
        }
        return etiquetas;
    }
    public static boolean checkNameEtiquetasIsEmpty(cat.iesmanacor.backend_private.entities.Etiquetas etiquetas, EtiquetasService etiquetasService) {
        if (etiquetas.getNombre()!=null) {
            return etiquetasService.findEtiquetaByName(etiquetas.getNombre()).isEmpty();
        }
        return false;
    }
}
