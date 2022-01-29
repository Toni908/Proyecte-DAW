package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Factura;
import cat.iesmanacor.backend_private.entities.Membresia;
import cat.iesmanacor.backend_private.entities.Restaurant;
import cat.iesmanacor.backend_private.services.FacturaService;
import cat.iesmanacor.backend_private.services.MembresiaService;
import cat.iesmanacor.backend_private.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.WebRequest;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.sql.Date;
import java.util.Calendar;
import java.util.Optional;
import java.util.Random;

@Controller
@RequestMapping("/restaurant/admin/membresia/")
public class MembresiaController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FacturaService facturaService;

    @Autowired
    private MembresiaService membresiaService;

    @GetMapping("/{id}")
    public String getMembresia(@PathVariable(value = "id") BigInteger id, Model model){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        model.addAttribute("restaurant", restaurant.get());

        return "membresia";
    }

    @Transactional
    @PostMapping("/{id}")
    public String saveMembresia(@PathVariable(value = "id") BigInteger id, Model model, WebRequest request){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        Membresia membresia = new Membresia();
        Factura factura = new Factura();

        factura.setNum_factura(randomCode()+id);
        factura.setDireccion(request.getParameter("dirrecion"));
        int duracion = Integer.parseInt(request.getParameter("duracion"));
        String importe;

        switch (duracion){
            case 1 : importe = "20";
                break;
            case 3 : importe = "50";
                break;
            case 6 : importe = "90";
                break;
            case 12 : importe = "150";
                break;
            case 24 : importe = "260";
                break;
            case 36 : importe = "360";
                break;
            default : return "redirect:/error";
        }
        factura.setImporte(Float.parseFloat(importe));

        facturaService.saveFactura(factura);

        Date sqlDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        membresia.setFactura(factura);
        membresia.setFecha_inicio(sqlDate);

        Calendar c = Calendar.getInstance();
        c.setTime(sqlDate);
        c.add(Calendar.MONTH, duracion);
        java.util.Date finDate = c.getTime();
        long timeInMilliSeconds = finDate.getTime();
        java.sql.Date date = new java.sql.Date(timeInMilliSeconds);

        membresia.setFecha_fin(date);

        membresiaService.saveMembresia(membresia);

        restaurant.get().setMembresia(membresia);
        restaurantService.saveRestaurant(restaurant.get());

        return "redirect:/restaurant/update/" + id;
    }

    public String randomCode() {
        int leftLimitNum = 48; // letter '0'
        int rightLimitNum = 57; // letter '9'
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimitNum + (int)
                    (random.nextFloat() * (rightLimitNum - leftLimitNum + 1));
            buffer.append((char) randomLimitedInt);
            if(random.nextInt() % 3 == 0){
                randomLimitedInt = leftLimit + (int)
                        (random.nextFloat() * (rightLimit - leftLimit + 1));
                buffer.append((char) randomLimitedInt);
            }
        }
        String generatedString = buffer.toString();

        return generatedString;
    }

}
