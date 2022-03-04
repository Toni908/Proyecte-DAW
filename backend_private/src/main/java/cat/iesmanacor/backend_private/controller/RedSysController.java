package cat.iesmanacor.backend_private.controller;

import org.springframework.ui.Model;
import org.springframework.web.context.request.WebRequest;
import sis.redsys.api.ApiMacSha256;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

public class RedSysController {

    public static String urlw;

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

        @PostMapping("enviar")
        public String enviar(WebRequest request, Model model){

            ApiMacSha256 apiMacSha256 = new ApiMacSha256();

            apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", "20");
            apiMacSha256.setParameter("DS_MERCHANT_ORDER", "1446068581");
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
}
