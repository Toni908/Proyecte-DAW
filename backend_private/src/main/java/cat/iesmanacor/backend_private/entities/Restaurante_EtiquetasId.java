package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Embeddable
public class Restaurante_EtiquetasId implements Serializable {

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_restaurante")
    @NotNull(message = "id_restaurante cant be null")
    private Restaurant restaurant;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_etiqueta")
    @NotNull(message = "id_etiqueta cant be null")
    private Etiquetas etiquetas;

    public Restaurante_EtiquetasId (Restaurant restaurant, Etiquetas etiquetas) {
        this.restaurant = restaurant;
        this.etiquetas = etiquetas;
    }
    public Restaurante_EtiquetasId(){}
}
