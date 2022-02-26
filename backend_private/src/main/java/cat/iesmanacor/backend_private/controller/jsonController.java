package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.configuration.MvnConfiguration;
import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class jsonController {
    @Autowired
    private IngredienteService ingredienteService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    EtiquetasService etiquetasService;

    @Autowired
    MunicipioService municipioService;

    @Autowired
    LocalidadService localidadService;

    @Autowired
    MembresiaService membresiaService;

    @Autowired
    ReservasService reservasService;

    @Autowired
    ComentariosService comentariosService;

    @GetMapping(value = "/get/restaurantes/admin/json")
    public List<Restaurant> getRestaurantes(){
        return restaurantService.findAllRestaurants();
    }

    @GetMapping(value = "/get/restaurant/comentarios/json/{id}",produces = { "application/json" })
    public List<Comentarios> getRestaurantesFromComentarios(@PathVariable BigInteger id){
        return comentariosService.findByIdRestaurante(id);
    }

    @GetMapping(value = "/get/etiquetas/admin/json", produces = { "application/json" })
    public List<Etiquetas> getEtiquetas(){
        return  etiquetasService.findAllEtiquetas();
    }

    @GetMapping(value = "/get/municipios/admin/json", produces = { "application/json" })
    public List<Municipios> getMunicipios(){
        return  municipioService.findAllMunicipios();
    }

    @GetMapping(value = "/get/localidades/admin/json", produces = { "application/json" })
    public List<Localidad> getLocalidades(){
        return  localidadService.findAllLocalidad();
    }

    @GetMapping(value = "/get/membresia/admin/json", produces = { "application/json" })
    public List<Membresia> getMembresias(){
        return  membresiaService.findAllMembresia();
    }

    @GetMapping(value = "/get/membresia/admin/json/{id}", produces = { "application/json" })
    public Membresia getSingleRestaurantMembresia(@PathVariable BigInteger id){
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        return restaurant.map(Restaurant::getMembresia).orElse(null);
    }

    @GetMapping(value = "/get/reservas/{id}/{section1}/{section2}/{section3}", produces = { "application/json" })
    public List<Reservas> getReservasForRestaurant(@PathVariable BigInteger id,@PathVariable String section1, @PathVariable String section2, @PathVariable String section3){
        MvnConfiguration mvnConfiguration = new MvnConfiguration();
        String lang = String.valueOf(mvnConfiguration.localeResolver());
        String sDate1= section1+"/"+section2+"/"+section3;

        if (lang.equals("ca")) {
            try {
                Date date = new SimpleDateFormat("dd/MM/yyyy").parse(sDate1);
                return reservasService.findReservasByFechaAndRestaurante(id, date, getNextDate(date));
            } catch (ParseException e) {
                //
                return null;
            }
        } else if (lang.equals("en")) {
            try {
                Date date = new SimpleDateFormat("MM/dd/yyyy").parse(sDate1);
                return reservasService.findReservasByFechaAndRestaurante(id, date, getNextDate(date));
            } catch (ParseException e) {
                //
                return null;
            }
        } else {
            try {
                Date date = new SimpleDateFormat("dd/MM/yyyy").parse(sDate1);
                return reservasService.findReservasByFechaAndRestaurante(id, date, getNextDate(date));
            } catch (ParseException e) {
                //
                return null;
            }
        }
    }

    public static String reFormatDate(Date date) {
        return date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getYear();
    }

    public static Date getNextDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        return calendar.getTime();
    }

    @GetMapping("/api/ingredients/")
    public List<Ingrediente> getIngredientes(){
        return ingredienteService.findAll();
    }

    @GetMapping("/api/ingredients/{nombre}")
    public List<Ingrediente> saveIngredient(@PathVariable(value = "nombre") String nombre){
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre(nombre);
        ingredienteService.save(ingrediente);

        return ingredienteService.findAll();
    }


    // STATS RESTAURANTES

    @GetMapping(value = "/comentarios/sum/servicio/{stars}/{id}",produces = { "application/json" })
    public Integer sumServicioDayValoration(@PathVariable int stars,@PathVariable BigInteger id){
        return comentariosService.countServicioFromRestaurantValorationAndTime(id,stars);
    }

    @GetMapping(value = "/comentarios/sum/comida/{stars}/{id}",produces = { "application/json" })
    public Integer sumComidaDayValoration(@PathVariable int stars,@PathVariable BigInteger id){
        return comentariosService.countComidaFromRestaurantValorationAndTime(id,stars);
    }

    @GetMapping(value = "/comentarios/sum/sitio/{stars}/{id}",produces = { "application/json" })
    public Integer sumSitioDayValoration(@PathVariable int stars, @PathVariable BigInteger id){
        return comentariosService.countSitioFromRestaurantValorationAndTime(id,stars);
    }
}
