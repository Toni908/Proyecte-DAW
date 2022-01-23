package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Ingrediente;
import cat.iesmanacor.backend_private.services.IngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientRestController {
    @Autowired
    private IngredienteService ingredienteService;

    @GetMapping("/")
    public List<Ingrediente> getIngredientes(){
        return ingredienteService.findAll();
    }

    @GetMapping("/{nombre}")
    public List<Ingrediente> saveIngredient(@PathVariable(value = "nombre") String nombre){
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre(nombre);
        ingredienteService.save(ingrediente);

        return ingredienteService.findAll();
    }

}
