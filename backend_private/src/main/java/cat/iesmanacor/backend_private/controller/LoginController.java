package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class LoginController {

    @Autowired
    private UseracountService useracountService;

    //card Controllers

    @GetMapping("/login")
    public String login(Model model){

        return "login";
    }
}
