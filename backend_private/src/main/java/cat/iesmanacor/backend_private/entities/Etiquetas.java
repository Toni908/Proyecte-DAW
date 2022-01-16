package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigInteger;

@Data
@Entity
@Table(name = "etiquetas")
public class Etiquetas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_etiqueta")
    BigInteger id_etiqueta;

    @NotNull(message = "Nombre cant be null")
    @Size(min=2, max=30, message = "Length of the name must be between 2 and 30")
    @Pattern(regexp = "^[^ª!\"·$%&/()=?¿\\\\|@#~½¬{\\[\\]}Ç*+\\-`'¡º<>;,:._]*$",message = "Cant use specials characters")
    @Column(name="nombre")
    String nombre;

    public Etiquetas(BigInteger id_etiqueta, String nombre) {
        this.id_etiqueta = id_etiqueta;
        this.nombre = nombre;
    }
    public Etiquetas(String nombre) {
        this.nombre = nombre;
    }
    public Etiquetas() {}
}
