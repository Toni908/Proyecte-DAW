package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Factura;
import cat.iesmanacor.backend_private.services.FacturaService;
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
import java.util.Optional;

@Controller
public class FacturaControllerImpl {

    @Autowired
    FacturaService facturaService;

    //////////////         ROUTES        ////////////////////

    @RequestMapping(value = "/factura/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute("factura") @Valid Factura factura, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/factura/create";
        }

        if (factura.getNum_factura()!=null) {
            Optional<Factura> requestFactura = facturaService.findFacturaById(factura.getNum_factura());
            if (requestFactura.isPresent()) {
                model.addAttribute("type","factura-create");
                model.addAttribute("object",new Factura());
                model.addAttribute("error","TRYING TO SAVE FACTURA THAT EXIST");
                return show(model);
            }
        }
        saveFactura(factura);
        return show(model);
    }


    @RequestMapping(value = "/factura/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute("factura") @Valid Factura factura, ModelMap model, Errors errors) {
        inicializeModelMap(model);
        if (errors.hasErrors()) {
            return "redirect:/faturas";
        }

        if (factura.getNum_factura()!=null) {
            Optional<Factura> facturaBefore = facturaService.findFacturaById(factura.getNum_factura());
            if (facturaBefore.isPresent()) {
                if (factura.getNum_factura().equals(facturaBefore.get().getNum_factura())) {
                    updateFactura(factura);
                } else {
                    model.addAttribute("error","factura id doesnt match with the actual factura id");
                }
            } else {
                model.addAttribute("error","factura id doesnt exit");
            }
        }

        return show(model);
    }

    @RequestMapping(value = "/factura/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable String id, ModelMap model) {
        if (id!=null) {
            Optional<Factura> factura = facturaService.findFacturaById(id);
            if (factura.isPresent()) {
                deleteFacturaById(id);
            } else {
                model.addAttribute("error", "FACTURA NOT FOUNDED");
            }
        }
        return new RedirectView("/facturas");
    }

    @RequestMapping(value = "/facturas",method = RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public String show(ModelMap model) {
        model.addAttribute("facturas",facturaService.findAllFactura());
        return "redirect:/";
    }


    /* ------------------------------------------ */


    public void saveFactura(Factura factura) {
        if (factura!=null) {
            facturaService.saveFactura(factura);
        }
    }

    public void deleteFacturaById(String id) {
        facturaService.deleteFactura(id);
    }

    public void updateFactura(Factura facturaNew) {
        facturaService.updateFactura(facturaNew);
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("factura");
        model.remove("facturas");
        model.remove("error");
    }
}
