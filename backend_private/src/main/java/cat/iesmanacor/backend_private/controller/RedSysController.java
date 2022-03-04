package cat.iesmanacor.backend_private.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.context.request.WebRequest;
import sis.redsys.api.ApiMacSha256;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/redsys")
public class RedSysController {

    public static String urlw;

        @PostMapping("/urlNotificacion")
        public void notification(){

        }

        @GetMapping("/urlOK")
        public String ok(){
            return "redirect:/lista/restaurantes";
        }

        @GetMapping("/urlKO")
        public String ko(){
            return "redirect:/login";
        }

        @GetMapping("/enviar")
        public String enviar(WebRequest request, Model model){

            ApiMacSha256 apiMacSha256 = new ApiMacSha256();

            apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", request.getParameter("price"));
            apiMacSha256.setParameter("DS_MERCHANT_ORDER", request.getParameter("fac"));
            apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", "999008881");
            apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
            apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
            apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "001");
            apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", "http://"+ urlw +":8080/redsys/urlNotificacion");
            apiMacSha256.setParameter("DS_MERCHANT_URLOK", "http://"+ urlw +":8080/redsys/urlOK");
            apiMacSha256.setParameter("DS_MERCHANT_URLKO", "http://"+ urlw +":8080/redsys/urlKO");

            String params = "";
            String firma = "";

            try {
                params = apiMacSha256.createMerchantParameters();

                String claveSHA256 = "sq7HjrUOBfKmC576ILgskD5srU870gJ7v";
                firma = apiMacSha256.createMerchantSignature(claveSHA256);
            }catch(Exception e){
                e.getMessage();
            }

            model.addAttribute("firma", firma);
            model.addAttribute("params", params);

            return "pago";
        }
}

