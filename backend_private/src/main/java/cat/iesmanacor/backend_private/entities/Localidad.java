package cat.iesmanacor.backend_private.entities;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigInteger;

@Data
@Entity
@ToString
@Table(name = "localidad")
public class Localidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_localidad")
    private BigInteger id_localidad;

    @Column(name = "nombre_localidad")
    @NotNull(message = "nombre_localidad cant be null")
    private String nombre_localidad;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "codigo_postal")
    private int codigo_postal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "nombre_municipio")
    private Municipios nombre_municipio;

    public Localidad(BigInteger id_localidad, String nombre_localidad, int codigo_postal, Municipios municipios) {
        this.id_localidad = id_localidad;
        this.nombre_localidad = nombre_localidad;
        this.codigo_postal = codigo_postal;
        this.nombre_municipio = municipios;
    }

    public Localidad() {

    }
}
