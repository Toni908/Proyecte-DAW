package cat.iesmanacor.backend_private.entities;

import cat.iesmanacor.backend_private.controller.CardController;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;
import java.util.List;

@Data
@ToString
@Entity
@Table(name="restaurante")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_restaurante")
    private BigInteger id_restaurante;

    @Column(name = "nombre")
    @NotNull(message = "nombre cant be null")
    @Size(min=2, max=40, message = "Length of the name must be between 2 and 30")
    @Pattern(regexp = "^[A-Za-z][a-z]+(?:[ ]+[A-Za-z][a-z]+)*$") // UPPERCASE THE FIRST LETTER AND SPACE ANOTHER UPPERCASE
    private String nombre;

    @Column(name = "dies_anticipacion_reservas")
    private int dies_anticipacion_reservas;

    @Column(name = "telefono_restaurante")
    private long telefono_restaurante;

    @Column(name = "validated",columnDefinition="boolean default '0'")
    private boolean validated;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_localidad")
    private Localidad localidad;

    @ManyToOne(optional = true)
    @JoinColumn(name = "id_membresia")
    private Membresia membresia;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_user")
    private Useracount useracount;

    @Column(name = "visible",columnDefinition="boolean default '0'")
    private boolean visible;

    @Column(name = "longitud")
    Double longitud;

    @Column(name = "latitud")
    Double latitud;

    @Column(name = "direccion")
    @NotNull
    String direccion;

    @Column(name = "aforo")
    @NotNull
    Long aforo;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "restaurant")
    private List<Carta> cartas;

    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "restaurant")
    private List<Periodo> periodos;

    @Transient
    public String getPhotosImagePath() {
        if (id_restaurante == null) return null;
        return "/restaurantes-photos/"+ id_restaurante + "/";
    }

    public Restaurant() {

    }

    public Restaurant(BigInteger id_restaurante, String nombre, int dies_anticipacion_reservas, long telefono_restaurante, boolean validated,String direccion, Long aforo, Localidad localidad, Membresia membresia, Useracount user, boolean visible,Double longitud, Double latitud) {
        this.id_restaurante = id_restaurante;
        this.nombre = nombre;
        this.dies_anticipacion_reservas = dies_anticipacion_reservas;
        this.telefono_restaurante = telefono_restaurante;
        this.validated = validated;
        this.localidad = localidad;
        this.membresia = membresia;
        this.latitud = latitud;
        this.longitud = longitud;
        this.aforo = aforo;
        this.direccion = direccion;
        this.useracount = user;
        this.visible = visible;
    }

    public Restaurant(String nombre, int dies_anticipacion_reservas, long telefono_restaurante, boolean validated, Localidad localidad,String direccion, Long aforo, Membresia membresia, Useracount user, boolean visible, Double longitud, Double latitud) {
        this.nombre = nombre;
        this.dies_anticipacion_reservas = dies_anticipacion_reservas;
        this.telefono_restaurante = telefono_restaurante;
        this.validated = validated;
        this.localidad = localidad;
        this.membresia = membresia;
        this.useracount = user;
        this.latitud = latitud;
        this.longitud = longitud;
        this.aforo = aforo;
        this.direccion = direccion;
        this.visible = visible;
    }

    public String getUrl() {
        if (nombre == null) return null;
        return "https://"+ CardController.urlw+"/restaurant/"+ nombre;
    }
}
