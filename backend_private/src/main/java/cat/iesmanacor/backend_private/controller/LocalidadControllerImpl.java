package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Localidad;
import cat.iesmanacor.backend_private.services.LocalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.Optional;

@Controller
public class LocalidadControllerImpl {

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    @Autowired
    LocalidadService localidadService;

    //////////////         LOCALIZACION    FORMULARIS     ////////////////////

    @RequestMapping(value = "/localidad/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","localidad-create");
        model.addAttribute("object",new Localidad());
        return __route_formularis;
    }

    @RequestMapping(value = "/localidad/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Localidad> localidad = localidadService.findLocalidadById(id);
            if (localidad.isPresent()) {
                model.addAttribute("type", "localidad-update");
                model.addAttribute("object", localidad.get());
                return __route_formularis;
            }
        }
        model.addAttribute("error","LOCALIDAD SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         LOCALIZACION  ACTIONS       ////////////////////


    @RequestMapping(value = "/localidad/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Localidad localidad, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if(errors.hasErrors()) {
            model.addAttribute("type","localidad-create");
            model.addAttribute("object",new Localidad());
            return "redirect:/localidad/create";
        }

        if (localidad.getId_localidad()!=null) {
            Optional<Localidad> requestLocalidad = localidadService.findLocalidadById(localidad.getId_localidad());
            if (requestLocalidad.isPresent()) {
                model.addAttribute("type", "localidad-create");
                model.addAttribute("object", new Localidad());
                model.addAttribute("error", "TRYING TO SAVE LOCALIDAD THAT EXIST");
                return show(model);
            }
        }
        if (localidad.getNombre_localidad()!=null)  {
            //MIRAR TAMBIEN POR EL NOMBRE PARA QUE HAYA DOS REPETIDOS
            if (!localidadService.findLocalidadByNombre_localidad(localidad.getNombre_localidad()).isEmpty()) {
                model.addAttribute("error", "name already exist");
            } else {
                saveLocalidad(localidad);
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/localidad/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Localidad localidad, BindingResult errors,ModelMap model) {
        inicializeModelMap(model);

        if(errors.hasErrors()) {
            model.addAttribute("type","localidad-create");
            model.addAttribute("object",new Localidad());
            return "redirect:/localidades";
        }

        if (localidad.getId_localidad()!=null) {
            Optional<Localidad> localidadUpdate = localidadService.findLocalidadById(localidad.getId_localidad());
            if (localidadUpdate.isPresent()) {
                if (isNombreTaken(localidad, localidadUpdate.get())) {
                    model.addAttribute("error", "name already exist");
                } else {
                    updateLocalidad(localidad);
                }
            } else {
                model.addAttribute("error", "localidad id doesnt exist");
            }
        }

        return show(model);
    }

    @RequestMapping(value = "/localidad/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Localidad> localidad = localidadService.findLocalidadById(id);
            if (localidad.isPresent()) {
                deleteLocalidadById(id);
            } else {
                model.addAttribute("error", "LOCALIDAD NOT FOUNDED");
            }
        }
        return new RedirectView("/localidades");
    }

    @RequestMapping(value = "/localidades",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String show(ModelMap model) {
        model.addAttribute("localidades",localidadService.findAllLocalidad());
        return __route_table;
    }

    @RequestMapping(value = "/localidad/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String findLocalidadById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Localidad> Localidad = localidadService.findLocalidadById(id);
            if (Localidad.isPresent()) {
                model.addAttribute("localidad", Localidad.get());
                return __route_table;
            }
        }
        model.addAttribute("error","FACTURA NOT FOUNDED");
        return __route_home;
    }


    /* ------------------------------------------ */


    public void saveLocalidad(Localidad localidad) {
        if (localidad!=null) {
            localidadService.saveLocalidad(localidad);
        }
    }

    public boolean checkName(String name) {
        return !localidadService.findLocalidadByNombre_localidad(name).isEmpty();
    }

    public void deleteLocalidadById(BigInteger id) {
        localidadService.deleteLocalidad(id);
    }

    public void updateLocalidad(Localidad localidadNew) {
        localidadService.updateLocalidad(localidadNew);
    }

    public boolean isNombreTaken(Localidad localidad, Localidad localidadUpdate) {
        if (localidad.getNombre_localidad()!=null) {
            if (localidad.getNombre_localidad().equals(localidadUpdate.getNombre_localidad())) {
                return false;
            } else {
                return checkName(localidad.getNombre_localidad());
            }
        }
        return true;
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("localidad");
        model.remove("localidades");
        model.remove("error");
    }
}
