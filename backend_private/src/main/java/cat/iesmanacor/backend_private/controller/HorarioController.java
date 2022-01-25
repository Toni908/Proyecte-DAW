package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Periodo;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.PeriodoService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigInteger;
import java.util.Optional;

@Controller
@RequestMapping("/restaurant/admin/horario")
public class HorarioController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private PeriodoService periodoService;

    @GetMapping("/{id}")
    public String getPeriodo(@PathVariable(value = "id") BigInteger id, Model model){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        String name = "Periodos de " + restaurant.get().getNombre();
        restaurant.get().setNombre(name);
        model.addAttribute("restaurant", restaurant.get());

        return "gestion_periodo";
    }

    @GetMapping("/delete/{id}")
    public String deletePeriodo(@PathVariable(value = "id") Long id, Model model){
        periodoService.deleteById(id);

        return "nada";
    }

    @GetMapping("/edit/periodo/{id}")
    public String editPeriodo(@PathVariable(value = "id") Long id, Model model){
        Optional<Periodo> periodo = periodoService.findById(id);
        model.addAttribute("periodo", periodo.get());

        return "periodo_modify";
    }

    @GetMapping("/create/periodo/{id}")
    public String createPeriodo(@PathVariable(value = "id") BigInteger id, Model model){
        Periodo periodo = new Periodo();
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        periodo.setRestaurant(restaurant.get());
        model.addAttribute("periodo", periodo);

        return "periodo_modify";
    }

    @PostMapping("/periodo/save/{id}")
    public String savePeriodo(@PathVariable(value = "id") Long id){
        return "nada";
    }
}
