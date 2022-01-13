package cat.iesmanacor.backend_private.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Platos")
public class Plato implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long idPlato;

        @Column(nullable = false)
        private String nombre;
        @Column(nullable = false)
        private String descripcion;
        @Column(nullable = false)
        private float precio;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "idCategoriaPlato", referencedColumnName = "idCategoria")
        private Carta carta;

        @OneToMany(fetch = FetchType.LAZY, mappedBy = "CategoriaPlatos")
        private List<Categoria> categories;

        @ManyToMany(cascade = CascadeType.ALL)
        @JoinTable(name = "PlatosAlergenos",
                joinColumns = { @JoinColumn(name = "idCarta") },
                inverseJoinColumns = { @JoinColumn(name = "idAlergeno")})
        private List<Alergeno> alergeno;

}
