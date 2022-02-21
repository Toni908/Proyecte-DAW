package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.*;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
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

    @GetMapping(value = "/comentarios/sum/servicio/restaurant/{id}",produces = { "application/json" })
    public Integer sumServicio(@PathVariable BigInteger id){
        return comentariosService.sumValoracion_servicioFromRestaurantId(id);
    }

    @GetMapping(value = "/comentarios/sum/comida/restaurant/{id}",produces = { "application/json" })
    public Integer sumComida(@PathVariable BigInteger id){
        return comentariosService.sumValoracion_comidaFromRestaurantId(id);
    }

    @GetMapping(value = "/comentarios/sum/sitio/restaurant/{id}",produces = { "application/json" })
    public Integer sumSitio(@PathVariable BigInteger id){
        return comentariosService.sumValoracion_sitioFromRestaurantId(id);
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

    @GetMapping(value = "/get/reservas/json/{id}/{date}", produces = { "application/json" })
    public List<Reservas> getReservasForRestaurant(@PathVariable BigInteger id,@PathVariable Date date){
        return reservasService.findReservasByFechaAndRestaurante(id,getDateFormat(date),getNextDate(date));
    }

    public String getDateFormat(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }

    public static String getNextDate(Date date) {
        final SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        return format.format(calendar.getTime());
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
}
