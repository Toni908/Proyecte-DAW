package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.ComentariosController;
import cat.iesmanacor.backend_private.entities.Comentarios;
import cat.iesmanacor.backend_private.services.ComentariosService;
import cat.iesmanacor.backend_private.services.ReservasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.Optional;

@Controller
public class ComentariosControllerImpl implements ComentariosController {

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    @Autowired
    ComentariosService comentariosService;

    @Autowired
    ReservasService reservasService;

    //////////////         COMENTARIOS FORMULARIOS        ////////////////////

    @RequestMapping(value = "/comentario/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","comentario-create");
        model.addAttribute("object",new Comentarios());
        model.addAttribute("array",reservasService.findAllReservass());
        return __route_formularis;
    }

    @RequestMapping(value = "/comentario/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Comentarios> comentarios = comentariosService.findComentarioById(id);
            if (comentarios.isPresent()) {
                model.addAttribute("type", "comentario-update");
                model.addAttribute("object", comentarios.get());
                model.addAttribute("array",reservasService.findAllReservass());
                return __route_formularis;
            }
        }
        model.addAttribute("error","COMMENTARIO SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         ROUTES        ////////////////////



    @RequestMapping(value = "/comentario/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Comentarios comentarios, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/comentario/create";
        }

        if (comentarios.getId_comentario()!=null) {
            Optional<Comentarios> requestComentario = comentariosService.findComentarioById(comentarios.getId_comentario());
            if (requestComentario.isPresent()) {
                model.addAttribute("type","comentario-create");
                model.addAttribute("object",new Comentarios());
                model.addAttribute("error","TRYING TO SAVE COMENTARIO THAT EXIST");
                return show(model);
            }
        }
        saveComentario(comentarios);
        return show(model);
    }


    @RequestMapping(value = "/comentario/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Comentarios comentario, ModelMap model, Errors errors) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/comentarios";
        }

        if (comentario.getId_comentario()!=null) {
            Optional<Comentarios> comentarioBefore = comentariosService.findComentarioById(comentario.getId_comentario());
            if (comentarioBefore.isPresent()) {
                if (comentario.getId_comentario().equals(comentarioBefore.get().getId_comentario())) {
                    updateComentario(comentario);
                } else {
                    model.addAttribute("error","comentario id doesnt match with the actual comentario id");
                }
            } else {
                model.addAttribute("error","comentario id doesnt exit");
            }
        }

        return show(model);
    }

    @RequestMapping(value = "/comentarios",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String show(ModelMap model) {
        model.addAttribute("comentarios",comentariosService.findAllComentarios());
        return __route_table;
    }

    @RequestMapping(value = "/comentario/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Comentarios> comentarios = comentariosService.findComentarioById(id);
            if (comentarios.isPresent()) {
                deleteComentarioById(id);
            } else {
                model.addAttribute("error", "FACTURA NOT FOUNDED");
            }
        }
        return new RedirectView("/comentarios");
    }


    @RequestMapping(value = "/comentario/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String findComentarioById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Comentarios> comentarios = comentariosService.findComentarioById(id);
            if (comentarios.isPresent()) {
                model.addAttribute("comentario", comentarios.get());
                return __route_table;
            }
        }
        model.addAttribute("error","COMENTARIO NOT FOUNDED");
        return __route_home;
    }

    /* ------------------------------------------ */


    @Override
    public void saveComentario(Comentarios comentarios) {
        if (comentarios!=null) {
            comentariosService.saveComentario(comentarios);
        }
    }

    @Override
    public void deleteComentarioById(BigInteger id) {
        comentariosService.deleteComentario(id);
    }

    @Override
    public void updateComentario(Comentarios comentariosNew) {
        comentariosService.updateComentario(comentariosNew);
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("comentario");
        model.remove("comentarios");
        model.remove("error");
    }
}
