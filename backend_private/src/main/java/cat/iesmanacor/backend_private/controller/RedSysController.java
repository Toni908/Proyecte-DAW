package cat.iesmanacor.backend_private.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

public class RedSysController {

    @Controller
    @RequestMapping("/redsys")
    public class CardController {

        @PostMapping("/urlNotificacion")
        public void notification(){

        }

        @PostMapping("/urlOK")
        public String ok(){
            return "redirect:/lista/restaurantes";
        }

        @PostMapping("/urlKO")
        public String ko(){
            return "redirect:/login";
        }
    }
}
