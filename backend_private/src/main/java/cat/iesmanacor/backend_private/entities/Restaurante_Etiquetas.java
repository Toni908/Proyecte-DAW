package cat.iesmanacor.backend_private.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "restaurante_etiquetas")
public class Restaurante_Etiquetas implements Serializable {
    @EmbeddedId Restaurante_EtiquetasId id;

    public Restaurante_Etiquetas(Restaurante_EtiquetasId id) {
        this.id = id;
    }
    public Restaurante_Etiquetas(){}
}
