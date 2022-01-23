package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Restaurant;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigInteger;
import java.util.Optional;

@Controller
@RequestMapping("/restaurant/admin/horario")
public class HorarioController {

    @GetMapping("/{id}")
    public String getCards(@PathVariable(value = "id") BigInteger id, Model model){

        return "gestion_horario";
    }
}
