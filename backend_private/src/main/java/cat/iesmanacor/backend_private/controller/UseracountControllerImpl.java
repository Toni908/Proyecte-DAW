package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.controllersImplements.UseracountController;
import cat.iesmanacor.backend_private.entities.Useracount;
import cat.iesmanacor.backend_private.services.UseracountService;
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
public class UseracountControllerImpl implements UseracountController {

    @Autowired
    UseracountService useracountService;

    private final String __route_formularis = "formularis/layout-form";
    private final String __route_table = "tables/layout-table";
    private final String __route_home = "links";

    //////////////         USER         ////////////////////

    @RequestMapping(value = "/user/create", method = RequestMethod.GET)
    public String create(ModelMap model) {
        model.addAttribute("type","useracount-create");
        model.addAttribute("object",new Useracount());
        return __route_formularis;
    }

    @RequestMapping(value = "/user/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable BigInteger id, ModelMap model) {
        if (id != null) {
            Optional<Useracount> useracount = useracountService.findUseracountById(id);
            if (useracount.isPresent()) {
                model.addAttribute("type","useracount-update");
                model.addAttribute("object",useracount.get());
                return __route_formularis;
            }
        }
        model.addAttribute("error","MEMBRESIA SELECTED DOESNT PRESENT");
        return __route_home;
    }


    //////////////         USER ACTIONS        ////////////////////


    @RequestMapping(value = "/user/save",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String save(@ModelAttribute @Valid Useracount useracount, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/user/create";
        }

        if (useracount.getId_user()!=null) {
            Optional<Useracount> requestUseracount = useracountService.findUseracountById(useracount.getId_user());
            if (requestUseracount.isPresent()) {
                model.addAttribute("type", "useracount-create");
                model.addAttribute("object", new Useracount());
                model.addAttribute("error", "TRYING TO SAVE USERACOUNT THAT EXIST");
                return show(model);
            }
        }

        if (useracount.getCorreo()!=null) {
            if (checkCorreo(useracount.getCorreo())) {
                model.addAttribute("error", "correo allready exist");
            } else {
                if (useracount.getNombre_usuario()!=null) {
                    if (!checkUsername(useracount.getNombre_usuario())) {
                        saveUseracount(useracount);
                    } else {
                        model.addAttribute("error", "Username allready exist");
                    }
                }
            }
        }
        return show(model);
    }

    @RequestMapping(value = "/user/put",method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String put(@ModelAttribute @Valid Useracount useracount, BindingResult errors, ModelMap model) {
        inicializeModelMap(model);

        if (errors.hasErrors()) {
            return "redirect:/users";
        }

        if (useracount.getId_user()!=null) {
            Optional<Useracount> useracountBefore = useracountService.findUseracountById(useracount.getId_user());
            if (useracountBefore.isPresent()) {
                if (useracount.getPassword()!=null) {
                    if (checkPassword(useracountBefore.get().getPassword(), useracount.getPassword())) {
                        // CHANGES --
                        model = checkToUpdate(useracount, useracountBefore.get(), model);
                    } else {
                        model.addAttribute("error", "password is incorrect (to update this user need to know the password)");
                    }
                }
            }
        } else {
            model.addAttribute("error","Request user is not present");
        }
        return show(model);
    }

    @RequestMapping(value = "/user/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public RedirectView delete(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Useracount> useracount = useracountService.findUseracountById(id);
            if (useracount.isPresent()) {
                deleteUseracountById(id);
            } else {
                model.addAttribute("error", "USERACOUNT NOT FOUNDED");
            }
        }
        return new RedirectView("/users");
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String show(ModelMap model) {
        model.addAttribute("useracounts",useracountService.findAllUseracount());
        return __route_table;
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = "application/json")
    @Override
    public String getUseracountById(@PathVariable BigInteger id, ModelMap model) {
        if (id!=null) {
            Optional<Useracount> useracount = useracountService.findUseracountById(id);
            if (useracount.isPresent()) {
                model.addAttribute("useracount", useracount.get());
                return __route_table;
            }
        }
        model.addAttribute("error","USERACOUNT NOT FOUNDED");
        return __route_home;
    }



    /* ------------------------------------------ */



    @Override
    public void saveUseracount(Useracount useracount) {
        if (useracount != null) {
            useracountService.saveUseracount(useracount);
        }
    }

    @Override
    public void deleteUseracountById(@PathVariable BigInteger id) {
        useracountService.deleteUseracount(id);
    }

    @Override
    public void updateUseracount(Useracount useracountNew) {
        useracountService.updateUseracount(useracountNew);
    }

    public void inicializeModelMap(ModelMap model) {
        model.remove("useracount");
        model.remove("useracounts");
        model.remove("error");
    }

    public boolean checkCorreo(String correo) {
        return !useracountService.findUseracountsByEmail(correo).isEmpty();
    }
    public boolean checkUsername(String username) {
        return !useracountService.findUseracountByUsername(username).isEmpty();
    }
    public boolean checkPassword(String password, String passwordUpdate) {
        return password.equals(passwordUpdate);
    }

    public ModelMap checkToUpdate(Useracount useracount, Useracount useracountBefore, ModelMap model) {
        if (isCorreoTaken(useracount,useracountBefore)) {
            model.addAttribute("error","correo is taken");
            return model;
        }
        if (isUsernameTaken(useracount,useracountBefore)) {
            model.addAttribute("error","username is taken");
            return model;
        }
        updateUseracount(useracount);
        return model;
    }

    public boolean isCorreoTaken(Useracount useracount, Useracount useracountBefore) {
        if (useracount.getCorreo()!=null) {
            if (useracount.getCorreo().equals(useracountBefore.getCorreo())) {
                return false;
            } else {
                return checkCorreo(useracount.getCorreo());
            }
        }
        return true;
    }
    public boolean isUsernameTaken(Useracount useracount, Useracount useracountBefore) {
        if (useracount.getNombre_usuario()!=null) {
            if (useracount.getNombre_usuario().equals(useracountBefore.getNombre_usuario())) {
                return false;
            } else {
                return checkUsername(useracount.getNombre_usuario());
            }
        }
        return true;
    }

}