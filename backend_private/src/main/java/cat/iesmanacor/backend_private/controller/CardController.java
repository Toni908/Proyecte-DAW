package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.componentes.QRCodeGenerator;
import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.files.FileUploadUtil;
import cat.iesmanacor.backend_private.services.*;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.*;

import static cat.iesmanacor.backend_private.componentes.User.getUser;

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
    public String getCards(@PathVariable(value = "id") BigInteger id, Model model, HttpServletRequest request){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        Useracount user = getUser(request);

        if(user == null || !restaurant.get().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        String qr = "https://www.trobalo.me/carta/" + id;
        // String path = "./src/main/resources/static/imgqr/"+id+".png";

        try {
            QRCodeGenerator.generateQRCodeImage(qr,250,250,id);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }

        String name = "Cartas de " + restaurant.get().getNombre();
        restaurant.get().setNombre(name);
        /*for(Carta carta:restaurant.get().getCartas()){
            carta.setUrl_img();
        }*/
        model.addAttribute("restaurant", restaurant.get());

        return "cards";
    }

    @GetMapping("/restaurant/admin/cards/delete/{id}")
    public String deleteCard(@PathVariable(value = "id") Long id, HttpServletRequest request){
        Useracount user = getUser(request);
        Optional<Carta> carta = cartaService.findById(id);

        if(user == null || !carta.get().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        cartaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/card/edit/{id}")
    public String editCard(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("restaurant", carta.get().getRestaurant());
        model.addAttribute("carta", carta.get());

        Useracount user = getUser(request);

        if(user == null || carta.get().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        return "card_modify";
    }

    @GetMapping("/restaurant/admin/{id}/card/create")
    public String createCard(@PathVariable(value = "id") BigInteger id, Model model, HttpServletRequest request){
        Carta carta = new Carta();
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

        Useracount user = getUser(request);

        if(user == null || !restaurant.get().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        carta.setRestaurant(restaurant.get());
        model.addAttribute("carta", carta);

        return "card_modify";
    }

    @PostMapping("/restaurant/admin/{id}/card/save")
    public RedirectView saveCard(@PathVariable(value = "id") BigInteger id, WebRequest request, @RequestParam("img") MultipartFile img, HttpServletRequest requesthttp){
        Carta carta = new Carta();
        String url;
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);

        Useracount user = getUser(requesthttp);

        if(user == null || !restaurant.get().getUseracount().equals(user)){
            return new RedirectView("/error/401") ;
        }

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

        carta.setRestaurant(restaurant.get());

        cartaService.save(carta);

        if(img != null){
            String fileName = StringUtils.cleanPath(img.getOriginalFilename());
            if (!fileName.equals("")) {
                fileName = "C" + carta.getId_carta() + fileName;
                carta.setUrl_img(fileName);
                try (InputStream inputStream = img.getInputStream()){
                    String uploadDir = ""+carta.getRestaurant().getId_restaurante();
                    FileUploadUtil.saveFile(uploadDir, fileName, img);
                    cartaService.save(carta);
                }catch(IOException e){

                }
            }
        }



        return new RedirectView(url);
    }

    // Category controllers

    @GetMapping("/restaurant/admin/category/delete/{id}")
    public String deleteCategory(@PathVariable(value = "id") Long id, HttpServletRequest request){
        Optional<Categoria> categoria = categoriaService.findById(id);

        Useracount user = getUser(request);

        if(user == null || !categoria.get().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        categoriaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/card/{id}/categories")
    public String getCategories(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("carta", carta.get());
        model.addAttribute("restaurant", carta.get().getRestaurant());

        Useracount user = getUser(request);

        if(user == null || !carta.get().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        return "categories";
    }

    @GetMapping("/restaurant/admin/card/{id}/category/create")
    public String createCategory(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Categoria category = new Categoria();
        Optional<Carta> carta = cartaService.findById(id);

        Useracount user = getUser(request);

        if(user == null || !carta.get().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        category.setCarta(carta.get());

        model.addAttribute("category", category);

        return "category_modify";
    }

    @GetMapping("/restaurant/admin/category/edit/{id}")
    public String editCategory(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Optional<Categoria> category = categoriaService.findById(id);
        model.addAttribute("category", category.get());

        Useracount user = getUser(request);

        if(user == null || !category.get().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        return "category_modify";
    }

    @PostMapping("/restaurant/admin/card/{id}/category/save")
    public String updateCategory(@Valid Categoria category, BindingResult result, @PathVariable(value = "id") Long idc, Model model, HttpServletRequest request){
        Optional<Carta> carta = cartaService.findById(idc);
        category.setCarta(carta.get());

        Long idcs = category.getId_categoria();

        if(idcs != null){
            Optional<Categoria> categorys = categoriaService.findById(idcs);
            category.setPlatos(categorys.get().getPlatos());
        }

        Useracount user = getUser(request);

        if(user == null || !carta.get().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
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
    public String deleteDish(@PathVariable(value = "id") Long id, HttpServletRequest request){
        Optional<Plato> plato = platoService.findById(id);

        Useracount user = getUser(request);

        if(user == null || !plato.get().getCategoria().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        platoService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/category/{id}/dishes")
    public String getDish(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Optional<Categoria> category = categoriaService.findById(id);
        if (category.isPresent()) {
            model.addAttribute("category", category.get());
            model.addAttribute("restaurant", category.get().getCarta().getRestaurant());

            Useracount user = getUser(request);

            if (user == null || !category.get().getCarta().getRestaurant().getUseracount().equals(user)) {
                return "redirect:/error/401";
            }
            return "platos";
        }
        return "redirect:/error/401";
    }

    @GetMapping("/restaurant/admin/category/{id}/dish/create")
    public String createDish(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Plato plato = new Plato();
        Optional<Categoria> categoria = categoriaService.findById(id);
        plato.setCategoria(categoria.get());
        model.addAttribute("restaurant", categoria.get().getCarta().getRestaurant());
        model.addAttribute("plato", plato);

        Useracount user = getUser(request);

        if(user == null || !categoria.get().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        return "dish_modify";
    }

    @PostMapping("/restaurant/admin/{id}/dish/save")
    public String saveDish(@Valid Plato plato, BindingResult result, @PathVariable(value = "id") Long id, Model model,@RequestParam("ingredientes") List<String> listaIngredientes, WebRequest request, HttpServletRequest requesthttp){
        Optional<Categoria> category = categoriaService.findById(id);
        plato.setCategoria(category.get());

        Useracount user = getUser(requesthttp);

        if(user == null || !category.get().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

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
            model.addAttribute("restaurant", category.get().getCarta().getRestaurant());
            return "dish_modify";
        }

        platoService.save(plato);

        return "redirect:/restaurant/admin/category/"+ id +"/dishes";
    }

    @GetMapping("/restaurant/admin/dish/edit/{id}")
    public String editDish(@PathVariable(value = "id") Long id, Model model, HttpServletRequest request){
        Optional<Plato> plato = platoService.findById(id);

        Useracount user = getUser(request);

        if(user == null || !plato.get().getCategoria().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }


        model.addAttribute("plato", plato.get());
        model.addAttribute("restaurant", plato.get().getCategoria().getCarta().getRestaurant());

        return "dish_modify";
    }

    @PostMapping("/edit/category/name/{id}")
        public String editNameCategory(@PathVariable(value = "id") Long id, WebRequest request, HttpServletRequest requesthttp){
            Optional<Categoria> categoria = categoriaService.findById(id);
            categoria.get().setNombre(request.getParameter("name"));

        Useracount user = getUser(requesthttp);

        if(user == null || !categoria.get().getCarta().getRestaurant().getUseracount().equals(user)){
            return "redirect:/error/401";
        }

        categoriaService.save(categoria.get());

            return "redirect:/restaurant/admin/category/" + id + "/dishes";
    }
}
