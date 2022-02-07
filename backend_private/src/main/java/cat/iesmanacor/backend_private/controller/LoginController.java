package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.UseracountService;
import org.apache.catalina.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.*;

@Controller
@RequestMapping("/")
public class LoginController {

    @Autowired
    private UseracountService useracountService;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/register")
    public String register(){
        return "register";
    }

    @PostMapping("/register")
    public String saveUser(@Valid Useracount useracount, BindingResult result, Model model){
        if(result.hasErrors()){
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(err ->{
                errores.put(err.getField(), "El campo ".concat(err.getField()).concat(" ").concat(err.getDefaultMessage()));
            });
            model.addAttribute("error", errores);
            model.addAttribute("user", useracount);
            return "register";
        }

        List<Useracount> dni = useracountService.findUseracountByDNI(useracount.getDni());
        List<Useracount> correo = useracountService.findUseracountsByEmail(useracount.getCorreo());
        if(dni.size() == 0 && correo.size() == 0){
            final String encrypted = BCrypt.hashpw(useracount.getPassword(), BCrypt.gensalt());
            useracount.setPassword(encrypted);

            useracountService.saveUseracount(useracount);
        }else{
            Map<String, String> errores = new HashMap<>();
            if(dni.size() != 0){
                errores.put("dni", "Este dni ya a sido registrado");
            }
            if(correo.size() != 0){
                errores.put("correo", "Este correo ya a sido registrado");
            }
            model.addAttribute("error", errores);
            model.addAttribute("user", useracount);
            return "register";
        }

        return "redirect:/login";
    }

    @PostMapping("/login")
    public String loginUser(@Valid Useracount useracount, BindingResult result, Model model, HttpServletRequest request){
        List<Useracount> user = useracountService.findUseracountsByEmail(useracount.getCorreo());

        if(!user.isEmpty()) {
            if (BCrypt.checkpw(useracount.getPassword(), user.get(0).getPassword())) {
                HttpSession session = request.getSession(true);
                session.setAttribute("user", user.get(0));
                //Useracount user = (Useracount) session.getAttribute("user");

                return "redirect:/lista/restaurantes";
            } else {
                model.addAttribute("errorp", "Contraseña incorrecta");
                return "login";
            }
        }else{
            model.addAttribute("errorc", "Correo no registrado");
            return "login";
        }

    }
}
