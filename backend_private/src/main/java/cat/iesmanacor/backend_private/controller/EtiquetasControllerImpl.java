package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.EtiquetasController;
import cat.iesmanacor.backend_private.entities.Etiquetas;
import cat.iesmanacor.backend_private.services.EtiquetasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Controller
public class EtiquetasControllerImpl implements EtiquetasController {

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    @Autowired
    EtiquetasService etiquetasService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/etiqueta/array/save",method = RequestMethod.POST)
    public String saveArrayEtiquetas(@RequestParam(value="myArray[]") List<String> myArray, ModelMap model) {
        inicializeModelMap(model);
        for (String s : myArray) {
            Etiquetas generatedEtiquetas = new Etiquetas();
            generatedEtiquetas.setNombre(s);
            if (checkNameIsEmpty(generatedEtiquetas)) {
                saveEtiquetas(generatedEtiquetas);
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/etiqueta/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Etiquetas etiquetas, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/etiqueta/create";
        }

        if (etiquetas.getId_etiqueta()!=null) {
            Optional<Etiquetas> requestEtiqueta = etiquetasService.findEtiquetaById(etiquetas.getId_etiqueta());
            if (requestEtiqueta.isPresent()) {
                model.addAttribute("type","etiquetas-create");
                model.addAttribute("object",new Etiquetas());
                model.addAttribute("error","TRYING TO SAVE ETIQUETA THAT EXIST");
                return show(model);
            }
        }

        if (etiquetas.getNombre()!=null) {
            if (checkNameIsEmpty(etiquetas)) {
                saveEtiquetas(etiquetas);
            } else {
                model.addAttribute("error", "ETIQUETA name already taken");
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/etiqueta/save/{name}",method = RequestMethod.POST)
    public void save(@PathVariable String name) {
        Etiquetas etiquetas = new Etiquetas();
        etiquetas.setNombre(name);

        if (name!=null) {
            if (checkNameIsEmpty(etiquetas)) {
                saveEtiquetas(etiquetas);
            }
        }
    }


    @RequestMapping(value = "/etiqueta/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Etiquetas etiquetas, ModelMap model, Errors errors) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/etiquetas";
        }

        if (etiquetas.getId_etiqueta()!=null) {
            Optional<Etiquetas> etiquetasOptional = etiquetasService.findEtiquetaById(etiquetas.getId_etiqueta());
            if (etiquetasOptional.isPresent()) {
                if (etiquetas.getId_etiqueta().equals(etiquetasOptional.get().getId_etiqueta())) {
                    if (etiquetas.getNombre()!=null && etiquetas.getId_etiqueta()!=null) {
                        if (checkNameIsEmpty(etiquetas)) {
                            updateEtiquetas(etiquetas);
                        } else {
                            model.addAttribute("error", "ETIQUETA name already taken");
                        }
                    }
                } else {
                    model.addAttribute("error","factura id doesnt match with the actual factura id");
                }
            } else {
                model.addAttribute("error","factura id doesnt exit");
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/etiqueta/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Etiquetas> etiquetas = etiquetasService.findEtiquetaById(id);
            if (etiquetas.isPresent()) {
                deleteEtiquetasById(id);
            } else {
                model.addAttribute("error", "ETIQUETAS NOT FOUNDED");
            }
        }
        return new RedirectView("/etiquetas");
    }

    @RequestMapping(value = "/etiquetas",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String show(ModelMap model) {
        model.addAttribute("etiquetas",etiquetasService.findAllEtiquetas());
        return __route_table;
    }

    @RequestMapping(value = "/etiqueta/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String findEtiquetasById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Etiquetas> etiquetas = etiquetasService.findEtiquetaById(id);
            if (etiquetas.isPresent()) {
                model.addAttribute("etiqueta", etiquetas.get());
                return __route_table;
            }
        }
        model.addAttribute("error","ETIQUETA NOT FOUNDED");
        return __route_home;
    }

    /* ------------------------------------------ */

    @Override
    public void saveEtiquetas(Etiquetas etiquetas) {
        etiquetasService.saveEtiqueta(etiquetas);
    }

    @Override
    public void deleteEtiquetasById(BigInteger id) {
        etiquetasService.deleteEtiqueta(id);
    }

    @Override
    public void updateEtiquetas(Etiquetas etiquetasNew) {
        etiquetasService.updateEtiqueta(etiquetasNew);
    }

    public boolean checkNameIsEmpty(Etiquetas etiquetas) {
        if (etiquetas.getNombre()!=null) {
            return etiquetasService.findEtiquetaByName(etiquetas.getNombre()).isEmpty();
        }
        return false;
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("etiqueta");
        model.remove("etiquetas");
        model.remove("error");
    }
}
