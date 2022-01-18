package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;

@AllArgsConstructor
@ToString
@Data
@Entity
@Table(name = "municipio")
public class Municipios {
    @Id
    @Column(name = "nombre_municipio")
    @Max(40)
    String nombre_municipio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_localidad")
    private Localidad localidad;

    public Municipios() {

    }
}
