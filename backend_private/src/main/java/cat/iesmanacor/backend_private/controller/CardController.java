package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Controller
@RequestMapping("/")
public class CardController {

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
    @Autowired
    private RestaurantService restaurantService;

    //card Controllers

    @GetMapping("/restaurant/admin/{id}/cards")
    public String getCards(@PathVariable(value = "id") BigInteger id, Model model){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        String name = "Cartas de " + restaurant.get().getNombre();
        restaurant.get().setNombre(name);
        model.addAttribute("restaurant", restaurant.get());

        return "cards";
    }

    @GetMapping("/restaurant/admin/cards/delete/{id}")
    public String deleteCard(@PathVariable(value = "id") Long id){
        cartaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/card/edit/{id}")
    public String editCard(@PathVariable(value = "id") Long id, Model model){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("card", carta.get());

        return "card_modify";
    }

    @GetMapping("/restaurant/admin/{id}/card/create")
    public String createCard(@PathVariable(value = "id") BigInteger id, Model model){
        Carta carta = new Carta();
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        carta.setRestaurant(restaurant.get());
        model.addAttribute("card", carta);

        return "card_modify";
    }

    @PostMapping("/restaurant/admin/{id}/card/save")
    public RedirectView saveCard(@PathVariable(value = "id") BigInteger id, WebRequest request, @RequestParam("img") MultipartFile img){
        Carta carta = new Carta();
        String url;
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        String name = request.getParameter("name");
        String useimg = request.getParameter("useimg");
        String visible = request.getParameter("visible");
        String idcs = request.getParameter("id");

        if(idcs != null){
            Long idl = Long.parseLong(idcs);
            Optional<Carta> cartas = cartaService.findById(idl);
            carta = cartas.get();
            url = "/restaurant/admin/card/"+idl+"/categories";
        }else{
            url = "/restaurant/admin/"+ id +"/cards";
        }

        carta.setNombre(name);

        if(useimg != null) {
            carta.setUsa_img(true);
        } else {
            carta.setUsa_img(false);
        }

        if(visible != null) {
            if (visible.equals("1") && !carta.isVisible()) {
                List<Carta> cartas = carta.getRestaurant().getCartas();
                for (int i = 0; i < cartas.size(); i++) {
                    Carta c = cartas.get(i);
                    if (c.isVisible()) {
                        c.setVisible(false);
                        break;
                    }
                }
                carta.setVisible(true);
            }
        }else if(carta.isVisible()) {
            carta.setVisible(false);
        }

        Path uploadPath = Paths.get("C:\\Users\\Fadrique\\Documents\\Toni\\SEGUNDO_AÑO\\Proyecto\\img");

        if(img != null){
            String fileName = StringUtils.cleanPath(img.getOriginalFilename());
            if (!fileName.equals("")) {
                carta.setUrl_img(fileName);
                try (InputStream inputStream = img.getInputStream()){
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                }catch(IOException e){

                }
            }
        }

        carta.setRestaurant(restaurant.get());

        cartaService.save(carta);

        return new RedirectView(url);
    }

    // Category controllers

    @GetMapping("/restaurant/admin/category/delete/{id}")
    public String deleteCategory(@PathVariable(value = "id") Long id){
        categoriaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/card/{id}/categories")
    public String getCategories(@PathVariable(value = "id") Long id, Model model){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("carta", carta.get());
        model.addAttribute("restaurant", carta.get().getRestaurant());

        return "categories";
    }

    @GetMapping("/restaurant/admin/card/{id}/category/create")
    public String createCategory(@PathVariable(value = "id") Long id, Model model){
        Categoria category = new Categoria();
        Optional<Carta> carta = cartaService.findById(id);

        category.setCarta(carta.get());

        model.addAttribute("category", category);

        return "category_modify";
    }

    @GetMapping("/restaurant/admin/category/edit/{id}")
    public String editCategory(@PathVariable(value = "id") Long id, Model model){
        Optional<Categoria> category = categoriaService.findById(id);
        model.addAttribute("category", category.get());

        return "category_modify";
    }

    @PostMapping("/restaurant/admin/card/{id}/category/save")
    public String updateCategory(@Valid Categoria category, BindingResult result, @PathVariable(value = "id") Long idc, Model model){
        Optional<Carta> carta = cartaService.findById(idc);
        category.setCarta(carta.get());

        Long idcs = category.getId_categoria();

        if(idcs != null){
            Optional<Categoria> categorys = categoriaService.findById(idcs);
            category.setPlatos(categorys.get().getPlatos());
        }

        if(result.hasErrors()){
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(err ->{
                errores.put(err.getField(), "El campo ".concat(err.getField()).concat(" ").concat(err.getDefaultMessage()));
            });
            model.addAttribute("error", errores);
            model.addAttribute("category", category);
            return "category_modify";
        }

        categoriaService.save(category);

        return "redirect:/restaurant/admin/card/"+ idc +"/categories";
    }

    // Platos Controllers

    @GetMapping("/restaurant/admin/dish/delete/{id}")
    public String deleteDish(@PathVariable(value = "id") Long id){
        platoService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/category/{id}/dishes")
    public String getDish(@PathVariable(value = "id") Long id, Model model){
        Optional<Categoria> category = categoriaService.findById(id);
        model.addAttribute("category", category.get());
        model.addAttribute("restaurant", category.get().getCarta().getRestaurant());

        return "platos";
    }

    @GetMapping("/restaurant/admin/category/{id}/dish/create")
    public String createDish(@PathVariable(value = "id") Long id, Model model){
        Plato plato = new Plato();
        Optional<Categoria> categoria = categoriaService.findById(id);
        plato.setCategoria(categoria.get());
        model.addAttribute("restaurant", categoria.get().getCarta().getRestaurant());
        model.addAttribute("plato", plato);

        return "dish_modify";
    }

    @PostMapping("/restaurant/admin/{id}/dish/save")
    public String saveDish(@Valid Plato plato, BindingResult result, @PathVariable(value = "id") Long id, Model model,@RequestParam("ingredientes") List<String> listaIngredientes, WebRequest request){
        Optional<Categoria> category = categoriaService.findById(id);
        plato.setCategoria(category.get());

        List<Alergeno> lista = new ArrayList<>();
        for(int x = 1 ; x <= 14 ; x++){
            String n = "cb" + Integer.toString(x);
            String p = request.getParameter(n);
            if(p != null){
                Long idA = Long.parseLong(p);
                Optional<Alergeno> alergeno = alergenoService.findById(idA);
                lista.add(alergeno.get());
            }
        }

        plato.setAlergenos(lista);
        List<Ingrediente> llista = new ArrayList<>();

        for (int i = 1; i < listaIngredientes.size(); i++) {
            String element = listaIngredientes.get(i);
            Long idIng = Long.parseLong(element);
            llista.add(ingredienteService.findById(idIng).get());
        }


        plato.setIngredientes(llista);

        if(result.hasErrors()){
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(err ->{
                errores.put(err.getField(), "El campo ".concat(err.getField()).concat(" ").concat(err.getDefaultMessage()));
            });
            model.addAttribute("error", errores);
            model.addAttribute("plato", plato);
            return "dish_modify";
        }

        platoService.save(plato);

        return "redirect:/restaurant/admin/category/"+ id +"/dishes";
    }

    @GetMapping("/restaurant/admin/dish/edit/{id}")
    public String editDish(@PathVariable(value = "id") Long id, Model model){
        Optional<Plato> plato = platoService.findById(id);
        model.addAttribute("plato", plato.get());
        model.addAttribute("restaurant", plato.get().getCategoria().getCarta().getRestaurant());

        return "dish_modify";
    }

    @PostMapping("/edit/category/name/{id}")
        public String editNameCategory(@PathVariable(value = "id") Long id, WebRequest request){
            Optional<Categoria> categoria = categoriaService.findById(id);
            categoria.get().setNombre(request.getParameter("name"));
            categoriaService.save(categoria.get());

            return "redirect:/restaurant/admin/category/" + id + "/dishes";
        }
}
