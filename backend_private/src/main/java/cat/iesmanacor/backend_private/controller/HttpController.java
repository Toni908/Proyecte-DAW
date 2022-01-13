package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/")
public class HttpController {

    @Autowired
    private AlergenoService alergenoService;
    @Autowired
    private CartaService cartaService;
    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private IngredienteService ingredienteService;
    @Autowired
    private PlatoService platoService;

    @GetMapping("/restaurant/admin/cards")
    public String getCards(Model model){
        List<Carta> cartas = cartaService.findAll();
        model.addAttribute("cartas", cartas);

        return "cards";
    }
}
