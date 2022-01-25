package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Horario;
import cat.iesmanacor.backend_private.entities.Periodo;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.HorarioService;
import cat.iesmanacor.backend_private.services.PeriodoService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.math.BigInteger;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Controller
@RequestMapping("/restaurant/admin")
public class HorarioController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private PeriodoService periodoService;

    @Autowired
    private HorarioService horarioService;

    @GetMapping("/horario/{id}")
    public String getPeriodo(@PathVariable(value = "id") BigInteger id, Model model){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        String name = "Periodos de " + restaurant.get().getNombre();
        restaurant.get().setNombre(name);
        model.addAttribute("restaurant", restaurant.get());

        return "periodos";
    }

    @GetMapping("/horario/delete/{id}")
    public String deletePeriodo(@PathVariable(value = "id") Long id, Model model){
        periodoService.deleteById(id);

        return "nada";
    }

    @GetMapping("/horario/edit/periodo/{id}")
    public String editPeriodo(@PathVariable(value = "id") Long id, Model model){
        Optional<Periodo> periodo = periodoService.findById(id);
        model.addAttribute("periodo", periodo.get());

        Date dateStart = periodo.get().getFecha_inicio();
        Date dateEnd = periodo.get().getFecha_fin();

        String dateStartS = dateStart.toString();
        String dateEndS = dateEnd.toString();

        String[] dateStarts = dateStartS.split("-");
        String[] dateEnds = dateEndS.split("-");

        String start = dateStarts[1] + "/" + dateStarts[2] + "/" + dateStarts[0];
        String dateValue = start + " - " + dateEnds[1] + "/" + dateEnds[2] + "/" + dateEnds[0];

        model.addAttribute("dateValue", dateValue);
        model.addAttribute("start", start);

        return "periodo_modify";
    }

    @GetMapping("/horario/create/periodo/{id}")
    public String createPeriodo(@PathVariable(value = "id") BigInteger id, Model model){
        Periodo periodo = new Periodo();
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        periodo.setRestaurant(restaurant.get());
        model.addAttribute("periodo", periodo);

        return "periodo_modify";
    }

    @PostMapping("/horario/periodo/save/{id}")
    public String savePeriodo(@PathVariable(value = "id") BigInteger id, @RequestParam("daterange") String dateRange, @Valid Periodo periodo, BindingResult result){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        periodo.setRestaurant(restaurant.get());

        if(periodo.getId_periodo() != null){
            Optional<Periodo> p = periodoService.findById(periodo.getId_periodo());
            periodo.setHorarios(p.get().getHorarios());
        }

        String[] splited = dateRange.split("\\s+");

        String[] dateStarts = splited[0].split("/");
        String[] dateEnds = splited[2].split("/");

        try {
            java.util.Date dateStartd = new SimpleDateFormat("yyyy/MM/dd").parse(dateStarts[2] + "/" + dateStarts[0] + "/" + dateStarts[1]);
            Date dateStart = new java.sql.Date(dateStartd.getTime());
            java.util.Date dateEndd = new SimpleDateFormat("yyyy/MM/dd").parse(dateEnds[2] + "/" + dateEnds[0] + "/" + dateEnds[1]);
            Date dateEnd = new java.sql.Date(dateEndd.getTime());
            periodo.setFecha_inicio(dateStart);
            periodo.setFecha_fin(dateEnd);
        }catch(ParseException e){
            System.out.println("Espero que nada vaya aqui nunca");
        }

        periodoService.save(periodo);

        return "redirect:/restaurant/admin/horario/"+ id;
    }

    // horarios

    @GetMapping("/periodo/horario/{id}")
    public String getHorario(@PathVariable(value = "id") Long id, Model model){
        Optional<Periodo> periodo = periodoService.findById(id);
        model.addAttribute("restaurant", periodo.get().getRestaurant());
        model.addAttribute("periodo", periodo.get());

        return "horarios";
    }

    @GetMapping("/periodo/horario/delete/{id}")
    public String deleteHorario(@PathVariable(value = "id") Long id){
        horarioService.deleteById(id);

        return "nada";
    }

    @GetMapping("/periodo/horario/create/{id}")
    public String createHorario(@PathVariable(value = "id") Long id, Model model){
        Horario horario = new Horario();
        horario.setPeriodo(periodoService.findById(id).get());
        model.addAttribute("horario", horario);

        return "horario_modify";
    }

    @GetMapping("/periodo/horario/edit/{id}")
    public String editHorario(@PathVariable(value = "id") Long id, Model model){
        Optional<Horario> horario = horarioService.findById(id);
        model.addAttribute("horario", horario.get());

        return "horario_modify";
    }

    @PostMapping("/periodo/horario/save/{id}")
    public String saveHorario(@PathVariable(value = "id") Long id){

        return "redirect: /restaurant/admin/periodo/horario/" + id;
    }
}
