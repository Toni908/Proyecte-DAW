package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Factura;
import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.FacturaService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.context.request.WebRequest;
import sis.redsys.api.ApiMacSha256;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/redsys")
public class RedSysController {

    public static String urlw;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FacturaService facturaService;

        @PostMapping("/urlNotificacion")
        public void notification(){

        }

        @GetMapping("/urlOK")
        public String ok(){
            return "redirect:/lista/restaurantes";
        }

        @GetMapping("/urlKO")
        public String ko(HttpServletRequest requesthttp){
            HttpSession session = requesthttp.getSession(false);
            Restaurant restaurant = new Restaurant();
            try{
                restaurant = (Restaurant) session.getAttribute("membresia");
            }catch (NullPointerException e){

            }
            Membresia membresia = restaurant.getMembresia();
            Factura factura = membresia.getFactura();
            restaurant.setMembresia(null);
            restaurantService.saveRestaurant(restaurant);
            facturaService.deleteFactura(factura.getNum_factura());

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

