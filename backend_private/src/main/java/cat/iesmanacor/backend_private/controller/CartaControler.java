package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entities.Carta;
import cat.iesmanacor.backend_private.services.CartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/cartas")
public class CartaControler {

    @Autowired
    private CartaService cartaService;

    //create new pelicula
    @PostMapping
    public ResponseEntity<?> create (@RequestBody Carta pelicula) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartaService.save(pelicula));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read (@PathVariable(value = "id") Long peliculaId){
        Optional<Carta> oPelicula = cartaService.findById(peliculaId);

        if(!oPelicula.isPresent()){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(oPelicula);
        }
    }

    //update a film
    @PutMapping("/{id}")
    public ResponseEntity<?> update (@RequestBody Carta peliculaDetails, @PathVariable(value = "id") Long peliculaId){
        Optional<Carta> pelicula = cartaService.findById(peliculaId);

        if(!pelicula.isPresent()){
            return ResponseEntity.notFound().build();
        }

        pelicula.get().setNombre(peliculaDetails.getNombre());
        pelicula.get().setUrl_img(peliculaDetails.getUrl_img());
        pelicula.get().setUsaIMG(peliculaDetails.getUsaIMG());
        pelicula.get().setIdRestaurant(peliculaDetails.getIdRestaurant());

        return ResponseEntity.status(HttpStatus.CREATED).body(cartaService.save(pelicula.get()));
    }

    //delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete (@PathVariable(value = "id") Long peliculaId){
        if(!cartaService.findById(peliculaId).isPresent()){
            return ResponseEntity.notFound().build();
        }

        cartaService.deleteById(peliculaId);
        return ResponseEntity.ok().build();
    }

    //read all Users
    @GetMapping
    public List<Carta> readAll(){
        List<Carta> peliculas = StreamSupport
                .stream(cartaService.findAll().spliterator(), false)
                .collect(Collectors.toList());

        return peliculas;
    }
}
