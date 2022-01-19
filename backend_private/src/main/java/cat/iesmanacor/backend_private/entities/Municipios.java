package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;
import java.math.BigInteger;

@AllArgsConstructor
@ToString
@Data
@Entity
@Table(name = "municipio")
public class Municipios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_municipio")
    BigInteger id_municipio;

    @Column(name = "nombre_municipio")
    @Max(40)
    String nombre_municipio;

    public Municipios() {

    }
}
