package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/restaurant/admin/card/categories/{id}")
    public String getCategories(@PathVariable(value = "id") Long id, Model model){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("carta", carta.get());

        return "categories";
    }

    @GetMapping("/restaurant/admin/cards/delete/{id}")
    public String deleteCard(@PathVariable(value = "id") Long id){
        cartaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/category/delete/{id}")
    public String deleteCategory(@PathVariable(value = "id") Long id){
        categoriaService.deleteById(id);

        return "nada";
    }

    @GetMapping("/restaurant/admin/card/edit/{id}")
    public String editCard(@PathVariable(value = "id") Long id, Model model){
        Optional<Carta> carta = cartaService.findById(id);
        model.addAttribute("carta", carta.get());

        return "edit_card";
    }

    @PostMapping("/restaurant/admin/card/edit/{id_card}")
    public RedirectView updateCard(@PathVariable(value = "id_card") Long id, WebRequest request){
        Optional<Carta> carta = cartaService.findById(id);
        String name = request.getParameter("name");
        String useimg = request.getParameter("useimg");
        String visible = request.getParameter("visible");

        carta.get().setNombre(name);

        if(useimg != null) {
            carta.get().setUsa_img(true);
        }else {
            carta.get().setUsa_img(false);
        }

        if(visible != null) {
            if (visible.equals("1") && !carta.get().isVisible()) {
                List<Carta> cartas = cartaService.findAll();
                for (int i = 0; i < cartas.size(); i++) {
                    Carta c = cartas.get(i);
                    if (c.isVisible()) {
                        c.setVisible(false);
                        break;
                    }
                }
                carta.get().setVisible(true);
            }
        }else if(carta.get().isVisible()) {
            carta.get().setVisible(false);
        }

        cartaService.save(carta.get());

        return new RedirectView("/restaurant/admin/cards");
    }

    @GetMapping("/restaurant/admin/card/create")
    public String createCard(Model model){

        return "create_card";
    }

    @PostMapping("/restaurant/admin/card/create")
    public RedirectView saveCard(WebRequest request, @RequestParam("img") MultipartFile img){
        Carta carta = new Carta();
        String name = request.getParameter("name");
        String useimg = request.getParameter("useimg");

        carta.setNombre(name);
        if(useimg != null) {
            carta.setUsa_img(true);
        } else {
            carta.setUsa_img(false);
        }

        Path uploadPath = Paths.get("C:\\Users\\Fadrique\\Documents\\Toni\\SEGUNDO_AÑO\\Proyecto\\img");

        if(img != null){
            String fileName = StringUtils.cleanPath(img.getOriginalFilename());
            carta.setUrl_img(fileName);

            try (InputStream inputStream = img.getInputStream()){
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }catch(IOException e){

            }
        }

        carta.setVisible(false);

        cartaService.save(carta);

        return new RedirectView("/restaurant/admin/cards");
    }
}
