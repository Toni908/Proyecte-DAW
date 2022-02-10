package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.services.UseracountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UseracountController {

    @Autowired
    UseracountService useracountService;


}
