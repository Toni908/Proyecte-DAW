package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigInteger;

@Data
@Entity
@Table(name = "localidad")
public class Localidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_localidad")
    private BigInteger id_localidad;

    @Column(name = "nombre_localidad")
    @NotNull(message = "nombre_localidad cant be null")
    @Pattern(regexp = "^[A-Z][a-z]+(?:[ ]+[A-Z][a-z]+)*$") // UPPERCASE THE FIRST LETTER AND SPACE ANOTHER UPPERCASE
    private String nombre_localidad;

    @Column(name = "codigo_postal")
    @NotNull(message = "codigo_postal cant be null")
    @Min(0)
    private int codigo_postal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_municipio")
    private Municipios id_municipio;

    public Localidad(BigInteger id_localidad, String nombre_localidad, int codigo_postal, Municipios municipios) {
        this.id_localidad = id_localidad;
        this.nombre_localidad = nombre_localidad;
        this.codigo_postal = codigo_postal;
        this.id_municipio = municipios;
    }

    public Localidad() {

    }
}
