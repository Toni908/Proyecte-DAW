package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "catalegpelicules")
public class Carta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarta;

    @Column(nullable = false)
    private String nombre;
    private String url_img;
    private boolean usaIMG;
    private Long idRestaurant;

/*
    public Pelicula(Long id, String tittle, int year, String director, String gender){
        this.id = id;
        this.tittle = tittle;
        this.year = year;
        this.director = director;
        this.gender = gender;
    }

    public Pelicula(String tittle, int year, String director, String gender){
        this.tittle = tittle;
        this.year = year;
        this.director = director;
        this.gender = gender;
    }

    public Pelicula(String tittle, String director, String gender){
        this.tittle = tittle;
        this.director = director;
        this.gender = gender;
    }

    public Pelicula(String tittle, int year, String gender){
        this.tittle = tittle;
        this.year = year;
        this.gender = gender;
    }

    public Pelicula(String tittle, String gender){
        this.tittle = tittle;
        this.gender = gender;
    }

    public Pelicula(Long id){
        this.id = id;
    }

    public Pelicula(){

    }
*/
    public Long getId(){ return idCarta; }

    public String getNombre() {
        return nombre;
    }

    public String getUrl_img() {
        return url_img;
    }

    public boolean getUsaIMG() {
        return usaIMG;
    }

    public Long getIdRestaurant() {
        return idRestaurant;
    }

    public void setId(Long idCarta){
        this.idCarta = idCarta;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setUrl_img(String url_img) {
        this.url_img = url_img;
    }

    public void setUsaIMG(boolean usaIMG) {
        this.usaIMG = usaIMG;
    }

    public void setIdRestaurant(Long idRestaurant) {
        this.idRestaurant = idRestaurant;
    }

    @Override
    public String toString() {
        return "Carta{" +
                "idCarta=" + idCarta +
                ", nombre='" + nombre + '\'' +
                ", url_img='" + url_img + '\'' +
                ", usaIMG=" + usaIMG +
                ", idRestaurant=" + idRestaurant +
                '}';
    }
}
