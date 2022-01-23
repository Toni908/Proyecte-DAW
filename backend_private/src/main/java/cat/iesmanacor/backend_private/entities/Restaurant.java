package cat.iesmanacor.backend_private.entities;

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

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,  mappedBy = "restaurant")
    private List<Carta> cartas;

    @Transient
    public String getPhotosImagePath() {
        if (id_restaurante == null) return null;
        return "/restaurantes-photos/" + id_restaurante + "/";
    }

    public Restaurant() {

    }

    public Restaurant(BigInteger id_restaurante, String nombre, int dies_anticipacion_reservas, long telefono_restaurante, boolean validated, Localidad localidad, Membresia membresia, Useracount user, boolean visible) {
        this.id_restaurante = id_restaurante;
        this.nombre = nombre;
        this.dies_anticipacion_reservas = dies_anticipacion_reservas;
        this.telefono_restaurante = telefono_restaurante;
        this.validated = validated;
        this.localidad = localidad;
        this.membresia = membresia;
        this.useracount = user;
        this.visible = visible;
    }

    public Restaurant(String nombre, int dies_anticipacion_reservas, long telefono_restaurante, boolean validated, Localidad localidad, Membresia membresia, Useracount user, boolean visible) {
        this.nombre = nombre;
        this.dies_anticipacion_reservas = dies_anticipacion_reservas;
        this.telefono_restaurante = telefono_restaurante;
        this.validated = validated;
        this.localidad = localidad;
        this.membresia = membresia;
        this.useracount = user;
        this.visible = visible;
    }
}
