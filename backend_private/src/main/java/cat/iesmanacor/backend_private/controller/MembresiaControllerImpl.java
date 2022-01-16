package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.MembresiaController;
import cat.iesmanacor.backend_private.entities.Factura;
import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.services.FacturaService;
import cat.iesmanacor.backend_private.services.MembresiaService;
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
public class MembresiaControllerImpl implements MembresiaController {

    @Autowired
    MembresiaService membresiaService;

    @Autowired
    FacturaService facturaService;

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    //////////////         MEMBRESIA FORMULARIOS        ////////////////////

    @RequestMapping(value = "/membresia/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","membresia-create");
        model.addAttribute("object",new Membresia());
        model.addAttribute("array",facturaService.findAllFactura());
        return __route_formularis;
    }

    @RequestMapping(value = "/membresia/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Membresia> membresia = membresiaService.findMembresiaById(id);
            if (membresia.isPresent()) {
                model.addAttribute("type", "membresia-update");
                model.addAttribute("object", membresia.get());
                model.addAttribute("array", facturaService.findAllFactura());
                return __route_formularis;
            }
        }
        model.addAttribute("error","MEMBRESIA SELECTED DOESNT PRESENT");
        return __route_home;
    }

    //////////////         MEMBRESIA ACTIONS        ////////////////////

    @RequestMapping(value = "/membresia/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Membresia membresia, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/membresia/create";
        }

        if (membresia.getFactura().getNum_factura()!=null) {
            Optional<Factura> factura = facturaService.findFacturaById(membresia.getFactura().getNum_factura());
            if (factura.isPresent()) {
                if (checkNum_Factura(factura.get().getNum_factura())) {
                    model.addAttribute("error", "factura relation is already done");
                } else {
                    saveMembresia(membresia);
                }
            } else {
                model.addAttribute("error","FACTURA NOT FOUND");
            }
        } else {
            model.addAttribute("error","FACTURA NOT FOUND");
        }
        return show(model);
    }


    @RequestMapping(value = "/membresia/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Membresia membresia, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/membresias";
        }

        if (membresia.getId_membresia()!=null && membresia.getFactura().getNum_factura()!=null) {
            Optional<Membresia> membresiaBefore = membresiaService.findMembresiaById(membresia.getId_membresia());
            Optional<Factura> factura = facturaService.findFacturaById(membresia.getFactura().getNum_factura());
            if (factura.isPresent() && membresiaBefore.isPresent()) {
                if (membresiaBefore.get().getFactura().getNum_factura().equals(membresia.getFactura().getNum_factura())) {
                    updateMembresia(membresia);
                } else if (membresiaService.findMembresiaByNum_Factura(factura.get().getNum_factura()).isEmpty()) {
                    updateMembresia(membresia);
                } else {
                    model.addAttribute("error", "factura is already vinculada");
                }
            } else {
                model.addAttribute("error","factura or membresia is not present");
            }
        } else {
            model.addAttribute("error","factura or membresia is not present");
        }
        return show(model);
    }

    @RequestMapping(value = "/membresia/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Membresia> membresia = membresiaService.findMembresiaById(id);
            if (membresia.isPresent()) {
                deleteMembresiaById(id);
            } else {
                model.addAttribute("error", "MEMBRESIA NOT FOUNDED");
            }
        }
        return new RedirectView("/membresias");
    }

    @RequestMapping(value = "/membresias",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String show(ModelMap model) {
        model.addAttribute("membresias",membresiaService.findAllMembresia());
        return __route_table;
    }

    @RequestMapping(value = "/membresia/{id}",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    @Override
    public String findMembresiaById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Membresia> membresia = membresiaService.findMembresiaById(id);
            if (membresia.isPresent()) {
                model.addAttribute("membresia", membresia.get());
                return __route_table;
            }
        }
        model.addAttribute("error","MEMBRESIA NOT FOUNDED");
        return __route_home;
    }


    //ERROR QUE ME DA PORQUE SI
    @RequestMapping(value = "/membresia/update",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String errorReturn(ModelMap model) {
        model.addAttribute("error","Page not found");
        return __route_home;
    }

    /* ------------------------------------------ */



    @Override
    public void saveMembresia(Membresia membresia) {
        if (membresia!=null) {
            membresiaService.saveMembresia(membresia);
        }
    }

    @Override
    public void deleteMembresiaById(BigInteger id) {
        membresiaService.deleteMembresia(id);
    }


    public boolean checkNum_Factura(String num_factura) {
        return !membresiaService.findMembresiaByNum_Factura(num_factura).isEmpty();
    }

    @Override
    public void updateMembresia(Membresia membresiaNew) {
        membresiaService.updateMembresia(membresiaNew);
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("membresia");
        model.remove("membresias");
        model.remove("error");
    }
}
