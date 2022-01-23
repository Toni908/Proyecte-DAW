package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigInteger;
import java.sql.Timestamp;

@Data
@Entity
@ToString
@Table(name = "reserva")
public class Reservas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private BigInteger id_reserva;

    @Column(name = "personas")
    @NotNull
    private BigInteger personas;

    @Column(name = "correo")
    @Email
    private String correo;

    @Column(name = "telefono")
    private long telefono;

    @Column(name = "nombre")
    @NotNull
    @Pattern(regexp = "^[A-Z][a-z]+(?:[ ]+[A-Z][a-z]+)*$") // UPPERCASE THE FIRST LETTER AND SPACE ANOTHER UPPERCASE
    private String nombre;

    @Column(name = "lenguaje")
    @NotNull
    @Size(min = 2,max = 2)
    private String lenguaje;

    @Column(name = "validated")
    @NotNull
    private boolean validated;

    @Column(name = "fecha_inicio")
    @NotNull
    private Timestamp fecha_inicio;

    @Column(name = "fecha_fin")
    @NotNull
    private Timestamp fecha_fin;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_restaurante")
    @NotNull(message = "id_restaurante cant be null")
    private Restaurant restaurant;

    public Reservas (BigInteger id_reserva, BigInteger personas, String correo, long telefono, String nombre, String lenguaje, boolean validated, Timestamp fecha_inicio, Timestamp fecha_fin, Restaurant restaurant) {
        this.id_reserva = id_reserva;
        this.personas = personas;
        this.correo = correo;
        this.telefono = telefono;
        this.nombre = nombre;
        this.lenguaje = lenguaje;
        this.validated = validated;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.restaurant = restaurant;
    }

    public Reservas (BigInteger personas, String correo, long telefono, String nombre, String lenguaje, boolean validated, Timestamp fecha_inicio, Timestamp fecha_fin, Restaurant restaurant) {
        this.personas = personas;
        this.correo = correo;
        this.telefono = telefono;
        this.nombre = nombre;
        this.lenguaje = lenguaje;
        this.validated = validated;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.restaurant = restaurant;
    }

    public Reservas(){}
}
