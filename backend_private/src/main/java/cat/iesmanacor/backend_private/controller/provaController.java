package cat.iesmanacor.backend_private.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class provaController {
    @GetMapping("/prova")
    public String getHome(){
        return "index";
    }
}
